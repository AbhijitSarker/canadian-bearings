"use client";
import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  FileText 
} from "lucide-react";

// Import the Table component you provided
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// --- MOCK DATA ---
const packagingData = [
  { label: "Packaging Type", value: "Box" },
  { label: "Pack Quantity", value: "1" },
  { label: "Box Length", value: "5.00 in" },
  { label: "Box Width", value: "5.00 in" },
  { label: "Box Height", value: "2.00 in" },
  { label: "Gross Weight", value: "0.45 lbs" },
];

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

const TABS = [
  "Technical Specifications",
  "Packaging Details",
  "Resources",
  "Customer Specific Info",
  "Order History"
];

export default function ProductTabs({ specs }) {
  const [activeTab, setActiveTab] = useState("Technical Specifications");

  return (
    <section className="my-16">
      <h2 className="mb-6 text-3xl font-bold text-slate-900">Overview</h2>

      {/* --- TAB HEADERS (Pill Style) --- */}
      <div className="mb-8 inline-flex w-full flex-wrap items-center rounded-lg bg-gray-100 p-1 sm:w-auto">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all sm:flex-none ${
                isActive
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-gray-500 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* --- TAB CONTENT --- */}
      <div className="min-h-[200px]">
        
        {/* 1. TECHNICAL SPECIFICATIONS */}
        {activeTab === "Technical Specifications" && (
          <div className="rounded-lg">
            <Table>
              <TableBody>
                {specs.map((spec, index) => (
                  <TableRow 
                    key={index} 
                    className={`border-none ${index % 2 === 0 ? "bg-gray-50/60" : "bg-white"}`}
                  >
                    <TableCell className="w-1/3 py-4 pl-6 font-bold text-slate-900">
                      {spec.label}
                    </TableCell>
                    <TableCell className="py-4 font-medium text-slate-700">
                      {spec.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-6">
                <button className="rounded-md border border-gray-200 px-6 py-2 text-sm font-medium hover:bg-gray-50">
                    See More
                </button>
            </div>
          </div>
        )}

        {/* 2. PACKAGING DETAILS */}
        {activeTab === "Packaging Details" && (
          <div className="rounded-lg">
             <Table>
              <TableBody>
                {packagingData.map((item, index) => (
                  <TableRow 
                    key={index} 
                    className={`border-none ${index % 2 === 0 ? "bg-gray-50/60" : "bg-white"}`}
                  >
                    <TableCell className="w-1/3 py-4 pl-6 font-bold text-slate-900">
                      {item.label}
                    </TableCell>
                    <TableCell className="py-4 font-medium text-slate-700">
                      {item.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-6">
                <button className="rounded-md border border-gray-200 px-6 py-2 text-sm font-medium hover:bg-gray-50">
                    See More
                </button>
            </div>
          </div>
        )}

        {/* 3. RESOURCES */}
        {activeTab === "Resources" && (
          <div className="flex flex-col items-center justify-center py-8 text-center sm:items-start sm:text-left">
            <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-center text-lg font-medium text-slate-900">Item Level Drawing</h3>
                
                {/* Drawing Placeholder */}
                <div className="mb-6 flex items-center justify-center rounded bg-gray-50 p-8">
                     {/* Replace with actual technical drawing image */}
                    <img 
                        src="https://placehold.co/200x200/png?text=Technical+Drawing" 
                        alt="Technical Drawing" 
                        className="h-40 w-auto object-contain mix-blend-multiply opacity-70"
                    />
                </div>

                {/* Download Button */}
                <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-colors hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-slate-700">Download Catalog [English]</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">(4mb)</span>
                        <Download className="h-4 w-4 text-gray-400" />
                    </div>
                </button>
            </div>
          </div>
        )}

        {/* 4. CUSTOMER SPECIFIC INFO */}
        {activeTab === "Customer Specific Info" && (
          <div className="rounded-lg">
            <Table>
              <TableBody>
                {customerInfoData.map((info, index) => (
                  <TableRow 
                    key={index} 
                    className={`border-none ${index % 2 === 0 ? "bg-gray-50/60" : "bg-white"}`}
                  >
                    <TableCell className="w-1/3 py-4 pl-6 font-bold text-slate-900">
                      {info.label}
                    </TableCell>
                    <TableCell className="py-4 font-medium text-slate-700">
                      {info.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* 5. ORDER HISTORY */}
        {activeTab === "Order History" && (
          <div className="space-y-6">
            
            {/* Summary Header */}
            <div className="text-sm text-slate-700">
                <span className="text-gray-500">Total Order:</span> <span className="font-bold">4</span>,{' '}
                <span className="text-gray-500">Total Quantity:</span> <span className="font-bold">35</span>,{' '}
                <span className="text-gray-500">Total Sale Amount:</span> <span className="font-bold">$231.28</span>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <div className="relative w-full max-w-xs">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-full rounded-md border border-gray-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold text-gray-500">⌘1</div>
                </div>
                
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gray-50">
                        <Filter className="h-4 w-4" /> Filter
                    </button>
                    <button className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gray-50">
                        Last Week <span className="text-[10px]">▼</span>
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="rounded-lg border border-gray-100 bg-white">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow className="border-b-gray-100 hover:bg-transparent">
                            <TableHead className="w-[180px]">Order Number</TableHead>
                            <TableHead>Customer PO</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Qty Ordered</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead>Interval</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderHistoryData.map((order, idx) => (
                            <TableRow key={idx} className="border-b-gray-50 last:border-0 hover:bg-gray-50/50">
                                <TableCell className="font-medium text-slate-600">{order.orderNo}</TableCell>
                                <TableCell>{order.po}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.price}</TableCell>
                                <TableCell>{order.qty}</TableCell>
                                <TableCell>{order.unit}</TableCell>
                                <TableCell className="font-bold">{order.interval}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="text-sm text-gray-500">Page 2 of 16</div>
                <div className="flex items-center gap-2">
                    <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50">
                        <ChevronLeft className="h-4 w-4 text-gray-600" />
                    </button>
                    {/* Pagination Numbers Mock */}
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-gray-600 hover:bg-gray-50">1</button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">2</button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-gray-600 hover:bg-gray-50">3</button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-gray-600 hover:bg-gray-50">4</button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-gray-600 hover:bg-gray-50">5</button>
                    <span className="text-gray-400">...</span>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-gray-600 hover:bg-gray-50">16</button>

                    <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50">
                        <ChevronRight className="h-4 w-4 text-gray-600" />
                    </button>
                </div>
                
                <div className="hidden sm:block">
                     <button className="flex items-center gap-2 rounded border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600">
                        7 / page <span className="text-[8px]">▼</span>
                     </button>
                </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}