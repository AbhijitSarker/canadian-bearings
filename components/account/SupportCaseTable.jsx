"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, ArrowUpDown, Loader2, MessageSquare } from "lucide-react";

function StatusBadge({ status }) {
  const styles = {
    "Open": "bg-blue-50 text-blue-700 border-blue-200",
    "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
    "Resolved": "bg-green-50 text-green-700 border-green-200",
    "Closed": "bg-gray-50 text-gray-700 border-gray-200",
  };

  return (
    <Badge variant="outline" className={`border px-2.5 py-0.5 ${styles[status] || "border-gray-200 text-gray-700"}`}>
      {status}
    </Badge>
  );
}

function PriorityBadge({ priority }) {
  const styles = {
    "High": "text-red-600 bg-red-50 border-red-200",
    "Medium": "text-amber-600 bg-amber-50 border-amber-200",
    "Low": "text-green-600 bg-green-50 border-green-200",
  };

  return (
    <Badge variant="outline" className={`border px-2.5 py-0.5 ${styles[priority] || "border-gray-200 text-gray-700"}`}>
      {priority}
    </Badge>
  );
}

export default function SupportCaseTable({ cases, sort, onSort, loading, error, onCaseClick }) {
  const SortIcon = ({ column }) => {
    if (!sort || sort.by !== column) return <ArrowUpDown size={14} className="ml-1 text-gray-400" />;
    return sort.direction === 'asc' ? <ArrowUp size={14} className="ml-1 text-gray-900" /> : <ArrowDown size={14} className="ml-1 text-gray-900" />;
  };

  return (
    <>
      <div className="min-h-[400px]">
        {/* Desktop Table View */}
        <div className="hidden md:block border border-gray-200 rounded-lg overflow-x-auto shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="border-b hover:bg-transparent">
                <TableHead 
                  className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => onSort && onSort('caseNo')}
                >
                  <div className="flex items-center">
                    Case No
                    <SortIcon column="caseNo" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap">Title</TableHead>
                <TableHead 
                  className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => onSort && onSort('dateCreated')}
                >
                  <div className="flex items-center">
                    Date Created
                    <SortIcon column="dateCreated" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap">Category</TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap">Priority</TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap">Status</TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap text-right">Messages</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Loader2 className="w-8 h-8 animate-spin mb-2 text-green-600" />
                      <p>Loading cases...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-64 text-center text-red-500">
                    {error}
                  </TableCell>
                </TableRow>
              ) : (!cases || cases.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-64 text-center text-gray-500">
                    No support cases found
                  </TableCell>
                </TableRow>
              ) : (
                cases.map((item) => (
                  <TableRow 
                    key={item.id} 
                    className="border-b hover:bg-green-50/50 cursor-pointer transition-colors"
                    onClick={() => onCaseClick(item)}
                  >
                    <TableCell className="text-[#171717] font-medium py-3 px-4 align-middle text-sm">{item.caseNo}</TableCell>
                    <TableCell className="text-[#171717] py-3 px-4 align-middle text-sm font-medium">{item.title}</TableCell>
                    <TableCell className="text-[#171717] py-3 px-4 align-middle text-sm whitespace-nowrap">{item.dateCreated}</TableCell>
                    <TableCell className="text-[#171717] py-3 px-4 align-middle text-sm">{item.categoryLabel}</TableCell>
                    <TableCell className="py-3 px-4 align-middle">
                      <PriorityBadge priority={item.priorityLabel} />
                    </TableCell>
                    <TableCell className="py-3 px-4 align-middle">
                      <StatusBadge status={item.statusLabel} />
                    </TableCell>
                    <TableCell className="text-right py-3 px-4 align-middle text-sm text-gray-500">
                      <div className="flex items-center justify-end gap-1">
                        <MessageSquare size={14} />
                        <span>{item.messageCount || 0}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {loading ? (
             <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin mb-2 text-green-600" />
                <p>Loading cases...</p>
             </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : (!cases || cases.length === 0) ? (
            <div className="text-center py-12 text-gray-500">No support cases found</div>
          ) : (
            cases.map((item) => (
              <div 
                key={item.id} 
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3 active:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onCaseClick(item)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-gray-900">{item.caseNo}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.dateCreated}</div>
                  </div>
                  <StatusBadge status={item.statusLabel} />
                </div>
                
                <div className="font-medium text-gray-900 text-sm">{item.title}</div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 text-xs block">Category</span>
                    <span className="text-gray-900">{item.categoryLabel}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 text-xs block">Priority</span>
                    <PriorityBadge priority={item.priorityLabel} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
