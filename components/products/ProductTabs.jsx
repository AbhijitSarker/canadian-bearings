"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  FileText,
  Package,
  Loader2
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getPackingInfo, getInventory } from "@/lib/api/services/products";
import toast from "react-hot-toast";

const TABS = [
  "Technical Specifications",
  "Packaging Details",
  "Inventory",
  "Resources",
  "Customer Specific Info",
  "Order History"
];

// Mock data for tabs that don't have APIs yet
const customerInfoData = [
  { label: "CB Product ID", value: "10035979" },
  { label: "Selling Unit Name", value: "each" },
  { label: "Min Order", value: "1.0000" },
  { label: "Location", value: "1" },
  { label: "Selling Unit Code", value: "EA" },
  { label: "Qty Interval", value: "1.0000" },
];

const orderHistoryData = [
  { orderNo: "SO-29-1006106", po: "IGORS MAZURS", date: "23-04-25", price: "$34", qty: 4, unit: "each", interval: "172" },
  { orderNo: "SO-29-1006106", po: "IGORS MAZURS", date: "23-04-25", price: "$34", qty: 4, unit: "each", interval: "172" },
  { orderNo: "SO-29-1006106", po: "IGORS MAZURS", date: "23-04-25", price: "$34", qty: 4, unit: "each", interval: "172" },
  { orderNo: "SO-29-1006106", po: "IGORS MAZURS", date: "23-04-25", price: "$34", qty: 4, unit: "each", interval: "172" },
];

// Reusable Component for the Row-style Tables
const SpecTable = ({ data, isLoading }) => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">No data available</p>
        </div>
      );
    }

    return (
        <div className="w-full">
            <div className="space-y-3">
                {data.map((item, index) => (
                    <div 
                        key={index} 
                        className="flex items-center px-6 py-5 bg-[#F9FAFB] rounded-lg border border-transparent transition-colors hover:border-gray-200"
                    >
                        <div className="w-1/2 text-[15px] font-semibold text-slate-900">
                            {item.label || item.name}
                        </div>
                        <div className="w-1/2 text-[15px] font-medium text-slate-800">
                            {item.value}{item.unit ? ' ' + item.unit : ''}
                        </div>
                    </div>
                ))}
            </div>
            
            {data.length > 10 && (
              <div className="mt-8">
                  <button className="h-11 px-10 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-slate-600 hover:bg-gray-50 transition-all shadow-sm">
                      See More
                  </button>
              </div>
            )}
        </div>
    );
};

export default function ProductTabs({ productUuid, custSKU, cbSku, specs = [] }) {
  const [activeTab, setActiveTab] = useState("Technical Specifications");
  const [packingData, setPackingData] = useState([]);
  const [inventoryData, setInventoryData] = useState(null);
  const [isLoadingPacking, setIsLoadingPacking] = useState(false);
  const [isLoadingInventory, setIsLoadingInventory] = useState(false);

  // Fetch packing info when Packaging Details tab is active
  useEffect(() => {
    if (activeTab === "Packaging Details" && productUuid && packingData.length === 0) {
      fetchPackingInfo();
    }
  }, [activeTab, productUuid]);

  // Fetch inventory when Inventory tab is active
  useEffect(() => {
    if (activeTab === "Inventory" && !inventoryData) {
      fetchInventoryData();
    }
  }, [activeTab]);

  const fetchPackingInfo = async () => {
    setIsLoadingPacking(true);
    try {
      const data = await getPackingInfo(productUuid);
      setPackingData(data);
    } catch (error) {
      console.error("Error fetching packing info:", error);
      toast.error("Failed to load packing information");
      setPackingData([]);
    } finally {
      setIsLoadingPacking(false);
    }
  };

  const fetchInventoryData = async () => {
    const partNo = custSKU || cbSku;
    
    if (!partNo) {
      setInventoryData({ success: false, message: "No part number available" });
      return;
    }

    setIsLoadingInventory(true);
    try {
      const data = await getInventory(partNo);
      setInventoryData(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      toast.error("Failed to load inventory");
      setInventoryData({ success: false, message: "Failed to load inventory" });
    } finally {
      setIsLoadingInventory(false);
    }
  };

  return (
    <section className="w-full py-10 bg-white">
      <h2 className="mb-8 text-[36px] font-extrabold text-slate-900 tracking-tight">Overview</h2>

      {/* --- TAB HEADER (UPDATED TO MATCH DESIGN) --- */}
      <div className="mb-10 w-full">
        <div className="w-full bg-[#F4F5F7] p-1.5 rounded-xl border border-gray-100 flex items-center overflow-x-auto no-scrollbar">
            <div className="flex gap-1.5 min-w-max">
                {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                    <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                        flex items-center justify-center px-6 py-2.5 text-[14px] font-semibold rounded-lg transition-all duration-200 whitespace-nowrap
                        ${isActive 
                            ? "bg-white text-slate-900 shadow-md border border-gray-100" 
                            : "text-slate-500 hover:text-slate-800"
                        }
                    `}
                    >
                    {tab}
                    </button>
                );
                })}
            </div>
        </div>
      </div>

      {/* --- TAB CONTENT --- */}
      <div className="min-h-[200px]">
        
        {/* 1. TECHNICAL SPECIFICATIONS */}
        {activeTab === "Technical Specifications" && (
            <SpecTable data={specs} isLoading={false} />
        )}

        {/* 2. PACKAGING DETAILS */}
        {activeTab === "Packaging Details" && (
            <SpecTable data={packingData} isLoading={isLoadingPacking} />
        )}

        {/* 3. INVENTORY */}
        {activeTab === "Inventory" && (
          <div className="w-full">
            {isLoadingInventory ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : !inventoryData?.success ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-gray-500">
                  {inventoryData?.message || "No inventory data available"}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Summary Header */}
                <div className="flex items-center gap-6 p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <Package className="h-4 w-4 text-slate-600" />
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      Total Available: <span className="text-[#4a8b3c]">{inventoryData.totalAvailable}</span>
                    </span>
                  </div>
                </div>

                {/* Inventory Table */}
                <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm">
                  <Table>
                    <TableHeader className="bg-[#F9FAFB] border-b border-gray-100">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-[14px] font-bold text-slate-900 h-14 pl-6">Warehouse</TableHead>
                        <TableHead className="text-[14px] font-bold text-slate-900 h-14">Qty Available</TableHead>
                        <TableHead className="text-[14px] font-bold text-slate-900 h-14">Qty On Hand</TableHead>
                        <TableHead className="text-[14px] font-bold text-slate-900 h-14">Qty Committed</TableHead>
                        <TableHead className="text-[14px] font-bold text-slate-900 h-14">Qty In Transit</TableHead>
                        <TableHead className="text-[14px] font-bold text-slate-900 h-14">Qty On Order</TableHead>
                        <TableHead className="text-[14px] font-bold text-slate-900 h-14">Qty Backordered</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventoryData.inventoryDetails?.map((warehouse, idx) => (
                        <TableRow key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                          <TableCell className="text-[13px] font-semibold text-slate-700 py-4 pl-6">{warehouse.warehouse}</TableCell>
                          <TableCell className="text-[13px] py-4">
                            <span className={warehouse.qtyAvailable > 0 ? "font-bold text-[#4a8b3c]" : "text-slate-600"}>
                              {warehouse.qtyAvailable}
                            </span>
                          </TableCell>
                          <TableCell className="text-[13px] text-slate-600 py-4">{warehouse.qtyOnHand}</TableCell>
                          <TableCell className="text-[13px] text-slate-600 py-4">{warehouse.qtyCommitted}</TableCell>
                          <TableCell className="text-[13px] text-slate-600 py-4">{warehouse.qtyInTransit}</TableCell>
                          <TableCell className="text-[13px] text-slate-600 py-4">{warehouse.qtyOnOrder}</TableCell>
                          <TableCell className="text-[13px] text-slate-600 py-4">{warehouse.qtyBackordered}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. RESOURCES */}
        {activeTab === "Resources" && (
          <div className="w-full max-w-[420px] mx-auto">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0px_2px_15px_rgba(0,0,0,0.03)]">
                <h3 className="mb-6 text-center text-[15px] font-bold text-slate-900 uppercase tracking-tight">Item Level Drawing</h3>
                
                {/* Drawing Placeholder Area */}
                <div className="mb-6 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-100 bg-slate-50/50 p-8 h-[240px]">
                    <div className="relative w-full h-full flex items-center justify-center opacity-80">
                         <img 
                            src="https://placehold.co/400x400/png?text=Drawing"
                            alt="Technical Drawing"
                            className="max-h-full max-w-full object-contain mix-blend-multiply grayscale"
                         />
                    </div>
                </div>

                {/* Download Button */}
                <button className="group flex w-full items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-3.5 text-sm transition-all hover:border-slate-200 hover:bg-slate-50 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="text-slate-400 transition-colors group-hover:text-slate-600">
                           <FileText size={18} />
                        </div>
                        <span className="font-semibold text-slate-700">Download Catalog [English]</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">(4mb)</span>
                        <Download className="h-4 w-4 text-slate-400 transition-colors group-hover:text-slate-600" />
                    </div>
                </button>
            </div>
          </div>
        )}

        {/* 5. CUSTOMER SPECIFIC INFO */}
        {activeTab === "Customer Specific Info" && (
            <SpecTable data={customerInfoData} isLoading={false} />
        )}

        {/* 6. ORDER HISTORY */}
        {activeTab === "Order History" && (
          <div className="space-y-6 w-full animate-in fade-in duration-500">
            
            {/* Summary Header */}
            <div className="text-[13px] font-medium text-slate-500">
                Total Order: <span className="font-bold text-slate-900 mr-4">4</span>
                Total Quantity: <span className="font-bold text-slate-900 mr-4">35</span>
                Total Sale Amount: <span className="font-bold text-slate-900">$231.28</span>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-[320px]">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search orders..." 
                        className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-12 text-[13px] outline-none transition-all focus:border-[#4a8b3c] focus:ring-1 focus:ring-[#4a8b3c]/20 shadow-sm placeholder:text-slate-400"
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded bg-slate-50 px-1.5 py-0.5 text-[10px] font-bold text-slate-400 border border-slate-100">
                        ⌘1
                    </div>
                </div>
                
                <div className="flex gap-3">
                    <button className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[14px] font-semibold text-slate-700 transition-all hover:bg-slate-50 shadow-sm">
                        <Filter className="h-4 w-4" /> Filter
                    </button>
                    <button className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[14px] font-semibold text-slate-700 transition-all hover:bg-slate-50 shadow-sm">
                        Last Week <ChevronRight className="h-3.5 w-3.5 rotate-90 opacity-60" />
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="rounded-xl border border-gray-100 bg-white overflow-hidden w-full shadow-sm">
                <Table>
                    <TableHeader className="bg-[#F9FAFB] border-b border-gray-100">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[180px] font-bold text-slate-900 h-14 pl-6 text-[14px]">Order Number</TableHead>
                            <TableHead className="font-bold text-slate-900 h-14 text-[14px]">Customer PO</TableHead>
                            <TableHead className="font-bold text-slate-900 h-14 text-[14px]">Order Date</TableHead>
                            <TableHead className="font-bold text-slate-900 h-14 text-[14px]">Price</TableHead>
                            <TableHead className="font-bold text-slate-900 h-14 text-[14px]">Qty Ordered</TableHead>
                            <TableHead className="font-bold text-slate-900 h-14 text-[14px]">Unit</TableHead>
                            <TableHead className="font-bold text-slate-900 h-14 text-[14px]">Interval</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderHistoryData.map((order, idx) => (
                            <TableRow key={idx} className="border-b border-gray-50 last:border-0 transition-colors hover:bg-slate-50/50">
                                <TableCell className="font-semibold text-slate-700 py-4 pl-6 text-[14px]">{order.orderNo}</TableCell>
                                <TableCell className="text-slate-600 py-4 text-[14px]">{order.po}</TableCell>
                                <TableCell className="text-slate-600 py-4 text-[14px]">{order.date}</TableCell>
                                <TableCell className="text-slate-600 py-4 text-[14px]">{order.price}</TableCell>
                                <TableCell className="text-slate-600 py-4 text-[14px] font-medium">{order.qty}</TableCell>
                                <TableCell className="text-slate-600 py-4 text-[14px]">{order.unit}</TableCell>
                                <TableCell className="font-bold text-slate-900 py-4 text-[14px]">{order.interval}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="text-[14px] text-slate-500 font-bold uppercase tracking-wider">Page 2 of 16</div>
                <div className="flex items-center gap-1.5">
                    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white hover:bg-slate-50 shadow-sm transition-all mr-2">
                        <ChevronLeft className="h-5 w-5 text-slate-600" />
                    </button>
                    
                    {[1, 2, 3, 4, 5].map((pageNum) => (
                      <button 
                        key={pageNum}
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-bold transition-all
                          ${pageNum === 2 
                            ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                          }
                        `}
                      >
                        {pageNum}
                      </button>
                    ))}
                    <span className="flex h-10 w-6 items-center justify-center text-[14px] text-slate-300 font-bold">...</span>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-900">16</button>

                    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white hover:bg-slate-50 shadow-sm transition-all ml-2">
                        <ChevronRight className="h-5 w-5 text-slate-600" />
                    </button>
                </div>
                
                <div className="hidden sm:block">
                     <button className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-5 py-2.5 text-[14px] font-bold text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
                        7 / page <ChevronRight className="h-4 w-4 rotate-90 opacity-60 ml-2" />
                     </button>
                </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}