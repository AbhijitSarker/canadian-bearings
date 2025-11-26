"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, AlertCircle, ArrowUp, ArrowDown, ArrowUpDown, Loader2 } from "lucide-react";

function ActionBadge({ action }) {
  if (action === "Processed" || action === "Done") {
    return (
      <Badge variant="outline" className="border-gray-300 text-gray-700 gap-1.5 px-3 py-1.5">
        <CheckCircle2 size={16} className="text-green-600" />
        {action}
      </Badge>
    );
  }
  if (action === "Pending") {
    return (
      <Badge variant="outline" className="border-gray-300 text-gray-700 gap-1.5 px-3 py-1.5">
        <Circle size={16} className="text-blue-600" fill="currentColor" />
        {action}
      </Badge>
    );
  }
  if (action === "Failed") {
    return (
      <Badge variant="outline" className="border-gray-300 text-gray-700 gap-1.5 px-3 py-1.5">
        <AlertCircle size={16} className="text-red-600" />
        {action}
      </Badge>
    );
  }
  return <Badge variant="outline" className="border-gray-300 text-gray-700">{action}</Badge>;
}

export default function QuoteTable({ quotes, sort, onSort, loading, error }) {
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
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap">Serial</TableHead>
                <TableHead 
                  className="font-medium text-gray-600 bg-[#F7F7F7] px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => onSort && onSort('quoteNo')}
                >
                  <div className="flex items-center">
                    Quote Number
                    <SortIcon column="quoteNo" />
                  </div>
                </TableHead>
                <TableHead 
                  className="font-medium text-gray-600 bg-[#F7F7F7] px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => onSort && onSort('createdDate')}
                >
                  <div className="flex items-center">
                    Order Date
                    <SortIcon column="createdDate" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap">Quoted By</TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap">Ship To</TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Loader2 className="w-8 h-8 animate-spin mb-2 text-green-600" />
                      <p>Loading quotes...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center text-red-500">
                    {error}
                  </TableCell>
                </TableRow>
              ) : (!quotes || quotes.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center text-gray-500">
                    No quotes found
                  </TableCell>
                </TableRow>
              ) : (
                quotes.map((quote) => (
                  <TableRow key={quote.quoteNo} className="border-b hover:bg-white">
                    <TableCell className="text-[#171717] font-medium py-2 sm:py-3 px-2 sm:px-4 align-middle text-xs sm:text-sm">{quote.rowNumber}</TableCell>
                    <TableCell className="text-[#171717] font-medium py-2 sm:py-3 px-2 sm:px-4 align-middle text-xs sm:text-sm">{quote.quoteNo}</TableCell>
                    <TableCell className="text-[#171717] py-2 sm:py-3 px-2 sm:px-4 align-middle text-xs sm:text-sm whitespace-nowrap">
                      {quote.createdDate ? new Date(quote.createdDate).toLocaleDateString('en-CA') : '-'}
                    </TableCell>
                    <TableCell className="text-[#171717] py-2 sm:py-3 px-2 sm:px-4 align-middle text-xs sm:text-sm">
                      {quote.placedByFirstName} {quote.placedByLastName}
                    </TableCell>
                    <TableCell className="text-[#171717] py-2 sm:py-3 px-2 sm:px-4 align-middle text-xs sm:text-sm">{quote.shipToName || '-'}</TableCell>
                    <TableCell className="py-2 sm:py-3 px-2 sm:px-4 align-middle">
                      <ActionBadge action={quote.statusName} />
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
                <p>Loading quotes...</p>
             </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : (!quotes || quotes.length === 0) ? (
            <div className="text-center py-12 text-gray-500">No quotes found</div>
          ) : (
            quotes.map((quote) => (
              <div 
                key={quote.quoteNo} 
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3 active:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-gray-900">{quote.quoteNo}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {quote.createdDate ? new Date(quote.createdDate).toLocaleDateString('en-CA') : '-'}
                    </div>
                  </div>
                  <ActionBadge action={quote.statusName} />
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 text-xs block">Quoted By</span>
                    <span className="text-gray-900 font-medium">{quote.placedByFirstName} {quote.placedByLastName}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 text-xs block">Serial</span>
                    <span className="text-gray-900 font-medium">#{quote.rowNumber}</span>
                  </div>
                  
                  <div className="col-span-2 pt-2 border-t border-gray-100 mt-2">
                    <span className="text-gray-500 text-xs block">Ship To</span>
                    <span className="text-gray-700">{quote.shipToName || '-'}</span>
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
