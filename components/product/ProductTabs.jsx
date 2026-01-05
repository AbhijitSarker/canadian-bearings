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

// Reusable Component for the Zebra Striped Tables
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
            <div className="rounded-lg overflow-hidden">
                {data.map((item, index) => (
                    <div 
                        key={index} 
                        className={`flex items-center px-6 py-5 ${
                            index % 2 === 0 ? "bg-[#F9FAFB]" : "bg-white"
                        }`}
                    >
                        <div className="w-1/3 text-sm font-semibold text-slate-900">
                            {item.label || item.name}
                        </div>
                        <div className="w-2/3 text-sm font-normal text-slate-900">
                            {item.value}{item.unit ? ' ' + item.unit : ''}
                        </div>
                    </div>
                ))}
            </div>
            {data.length > 7 && (
              <div className="mt-6">
                  <button className="h-10 px-8 rounded-lg border border-gray-200 bg-white text-sm font-medium text-slate-700 hover:bg-gray-50 transition-colors shadow-sm">
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
      <h2 className="mb-6 text-[32px] font-bold text-slate-900 tracking-tight">Overview</h2>

      {/* --- TAB HEADER (FULL WIDTH SEGMENTED CONTROL) --- */}
      <div className="mb-8 w-full">
        <div className="w-full bg-[#F4F5F7] p-1.5 rounded-xl overflow-x-auto no-scrollbar">
            <div className="flex md:grid md:grid-cols-6 gap-1 min-w-max md:min-w-0">
                {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                    <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                        flex items-center justify-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap
                        ${isActive 
                            ? "bg-white text-slate-900 shadow-sm" 
                            : "text-slate-500 hover:text-slate-700 hover:bg-gray-200/50"
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
                <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-slate-600" />
                    <span className="text-sm font-semibold text-slate-900">
                      Total Available: <span className="text-green-600">{inventoryData.totalAvailable}</span>
                    </span>
                  </div>
                </div>

                {/* Inventory Table */}
                <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                  <Table>
                    <TableHeader className="bg-[#F9FAFB]">
                      <TableRow className="border-b border-gray-200 hover:bg-[#F9FAFB]">
                        <TableHead className="font-medium text-slate-500 h-12 pl-6">Warehouse</TableHead>
                        <TableHead className="font-medium text-slate-500 h-12">Qty Available</TableHead>
                        <TableHead className="font-medium text-slate-500 h-12">Qty On Hand</TableHead>
                        <TableHead className="font-medium text-slate-500 h-12">Qty Committed</TableHead>
                        <TableHead className="font-medium text-slate-500 h-12">Qty In Transit</TableHead>
                        <TableHead className="font-medium text-slate-500 h-12">Qty On Order</TableHead>
                        <TableHead className="font-medium text-slate-500 h-12">Qty Backordered</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventoryData.inventoryDetails?.map((warehouse, idx) => (
                        <TableRow key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                          <TableCell className="font-medium text-slate-700 py-4 pl-6">{warehouse.warehouse}</TableCell>
                          <TableCell className="text-slate-600 py-4">
                            <span className={warehouse.qtyAvailable > 0 ? "font-semibold text-green-600" : ""}>
                              {warehouse.qtyAvailable}
                            </span>
                          </TableCell>
                          <TableCell className="text-slate-600 py-4">{warehouse.qtyOnHand}</TableCell>
                          <TableCell className="text-slate-600 py-4">{warehouse.qtyCommitted}</TableCell>
                          <TableCell className="text-slate-600 py-4">{warehouse.qtyInTransit}</TableCell>
                          <TableCell className="text-slate-600 py-4">{warehouse.qtyOnOrder}</TableCell>
                          <TableCell className="text-slate-600 py-4">{warehouse.qtyBackordered}</TableCell>
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
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0px_2px_10px_rgba(0,0,0,0.02)]">
                <h3 className="mb-6 text-center text-[15px] font-medium text-slate-900">Item Level Drawing</h3>
                
                {/* Drawing Placeholder Area */}
                <div className="mb-6 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-[#FAFAFA] p-8 h-[240px]">
                    <div className="relative w-full h-full flex items-center justify-center opacity-80">
                         <img 
                            src="https://placehold.co/400x400/png?text=Drawing"
                            alt="Technical Drawing"
                            className="max-h-full max-w-full object-contain mix-blend-multiply grayscale"
                         />
                    </div>
                </div>

                {/* Download Button */}
                <button className="group flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-all hover:border-gray-300 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="text-gray-400 rotate-45">
                           <FileText size={18} />
                        </div>
                        <span className="font-medium text-slate-600">Download Catalog [English]</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 font-medium">(4mb)</span>
                        <Download className="h-4 w-4 text-gray-400" />
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
          <div className="space-y-6 w-full">
            
            {/* Summary Header */}
            <div className="text-[13px] text-slate-600">
                <span className="text-gray-500">Total Order:</span> <span className="font-semibold text-slate-900 mr-3">4</span>,{' '}
                <span className="text-gray-500">Total Quantity:</span> <span className="font-semibold text-slate-900 mr-3">35</span>,{' '}
                <span className="text-gray-500">Total Sale Amount:</span> <span className="font-semibold text-slate-900">$231.28</span>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-[280px]">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-full rounded-md border border-gray-200 py-2 pl-9 pr-12 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold text-gray-500 border border-gray-200">
                        ⌘1
                    </div>
                </div>
                
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gray-50">
                        <Filter className="h-4 w-4" /> Filter
                    </button>
                    <button className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gray-50">
                        Last Week <span className="text-[8px] ml-1 opacity-60">▼</span>
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="rounded-lg border border-gray-200 bg-white overflow-hidden w-full">
                <Table>
                    <TableHeader className="bg-[#F9FAFB]">
                        <TableRow className="border-b border-gray-200 hover:bg-[#F9FAFB]">
                            <TableHead className="w-[180px] font-medium text-slate-500 h-12 pl-6">Order Number</TableHead>
                            <TableHead className="font-medium text-slate-500 h-12">Customer PO</TableHead>
                            <TableHead className="font-medium text-slate-500 h-12">Order Date</TableHead>
                            <TableHead className="font-medium text-slate-500 h-12">Price</TableHead>
                            <TableHead className="font-medium text-slate-500 h-12">Qty Ordered</TableHead>
                            <TableHead className="font-medium text-slate-500 h-12">Unit</TableHead>
                            <TableHead className="font-medium text-slate-500 h-12">Interval</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderHistoryData.map((order, idx) => (
                            <TableRow key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                <TableCell className="font-medium text-slate-600 py-4 pl-6">{order.orderNo}</TableCell>
                                <TableCell className="text-slate-600 py-4">{order.po}</TableCell>
                                <TableCell className="text-slate-600 py-4">{order.date}</TableCell>
                                <TableCell className="text-slate-600 py-4">{order.price}</TableCell>
                                <TableCell className="text-slate-600 py-4">{order.qty}</TableCell>
                                <TableCell className="text-slate-600 py-4">{order.unit}</TableCell>
                                <TableCell className="font-bold text-slate-900 py-4">{order.interval}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-2">
                <div className="text-sm text-gray-500 font-medium">Page 2 of 16</div>
                <div className="flex items-center gap-1">
                    <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 mr-2">
                        <ChevronLeft className="h-4 w-4 text-gray-600" />
                    </button>
                    
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-gray-500 hover:bg-gray-100 font-medium">1</button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white shadow-sm">2</button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-gray-500 hover:bg-gray-100 font-medium">3</button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-gray-500 hover:bg-gray-100 font-medium">4</button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-gray-500 hover:bg-gray-100 font-medium">5</button>
                    <span className="flex h-8 w-8 items-center justify-center text-sm text-gray-400">...</span>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-gray-500 hover:bg-gray-100 font-medium">16</button>

                    <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 ml-2">
                        <ChevronRight className="h-4 w-4 text-gray-600" />
                    </button>
                </div>
                
                <div className="hidden sm:block">
                     <button className="flex items-center gap-2 rounded border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
                        7 / page <span className="text-[8px] opacity-60">▼</span>
                     </button>
                </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}