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
import { CheckCircle2, Circle, AlertCircle } from "lucide-react";

function ActionBadge({ action }) {
  if (action === "Done") {
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

export default function QuoteTable({ quotes }) {
  if (!quotes || quotes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No quotes found
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="">
          <TableRow className="border-b hover:bg-transparent">
            <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4">Serial</TableHead>
            <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4">Quote Number</TableHead>
            <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4">Order Date</TableHead>
            <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4">Quoted By</TableHead>
            <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4">Reference</TableHead>
            <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes.map((quote) => (
            <TableRow key={quote.id} className="border-b hover:bg-white">
              <TableCell className="text-[#171717] font-medium py-3 px-4 align-middle">{quote.serial}</TableCell>
              <TableCell className="text-[#171717] font-medium py-3 px-4 align-middle">{quote.quoteNumber}</TableCell>
              <TableCell className="text-[#171717] py-3 px-4 align-middle">{quote.orderDate}</TableCell>
              <TableCell className="text-[#171717] py-3 px-4 align-middle">{quote.quotedBy}</TableCell>
              <TableCell className="text-[#171717] py-3 px-4 align-middle">{quote.reference}</TableCell>
              <TableCell className="py-3 px-4 align-middle">
                <ActionBadge action={quote.action} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
