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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// --- MOCK DATA ---
const specsData = [
    { label: "Bearing Type", value: "Deep Groove" },
    { label: "O.D. Type", value: "Cylindrical" },
    { label: "Cage Material", value: "Bearing Steel" },
    { label: "O.D.", value: "4.72 in, 120 mm" },
    { label: "Width", value: "1.14 in, 29 mm" },
    { label: "Inch/Metric", value: "Metric" },
    { label: "Outer Ring Width", value: "1.14 in, 29 mm" },
];

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

// Reusable Component for the Zebra Striped Tables
const SpecTable = ({ data }) => {
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
                            {item.label}
                        </div>
                        <div className="w-2/3 text-sm font-normal text-slate-900">
                            {item.value}
                        </div>
                    </div>
                ))}
            </div>
            {/* "See More" button matches the clean white look with border */}
            <div className="mt-6">
                <button className="h-10 px-8 rounded-lg border border-gray-200 bg-white text-sm font-medium text-slate-700 hover:bg-gray-50 transition-colors shadow-sm">
                    See More
                </button>
            </div>
        </div>
    );
};

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("Technical Specifications");

  return (
    <section className="w-full py-10 bg-white font-sans">
      <h2 className="mb-6 text-[32px] font-bold text-slate-900 tracking-tight">Overview</h2>

      {/* --- TAB HEADER (FULL WIDTH SEGMENTED CONTROL) --- */}
      <div className="mb-8 w-full">
        {/* FIX: Changed from 'inline-flex' to 'grid grid-cols-5 w-full'.
            This forces the gray background to span the full width and distributes tabs evenly.
            On smaller screens (below md), it falls back to a scrollable flex view.
        */}
        <div className="w-full bg-[#F4F5F7] p-1.5 rounded-xl overflow-x-auto no-scrollbar">
            <div className="flex md:grid md:grid-cols-5 gap-1 min-w-max md:min-w-0">
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
            <SpecTable data={specsData} />
        )}

        {/* 2. PACKAGING DETAILS */}
        {activeTab === "Packaging Details" && (
            <SpecTable data={packagingData} />
        )}

        {/* 3. RESOURCES */}
        {activeTab === "Resources" && (
          <div className="w-full max-w-[420px]">
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

        {/* 4. CUSTOMER SPECIFIC INFO */}
        {activeTab === "Customer Specific Info" && (
            <SpecTable data={customerInfoData} />
        )}

        {/* 5. ORDER HISTORY */}
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