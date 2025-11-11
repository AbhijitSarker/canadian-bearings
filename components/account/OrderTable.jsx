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

function StatusBadge({ status }) {
  if (status === "Billed") {
    return (
      <Badge variant="outline" className="border-gray-300 text-gray-700 gap-1.5 px-3 py-1.5">
        <CheckCircle2 size={16} className="text-green-600" />
        {status}
      </Badge>
    );
  }
  if (status === "Partially Fulfilled") {
    return (
      <Badge variant="outline" className="border-gray-300 text-gray-700 gap-1.5 px-3 py-1.5">
        <Circle size={16} className="text-blue-600" fill="currentColor" />
        {status}
      </Badge>
    );
  }
  if (status === "Pending Fulfillment") {
    return (
      <Badge variant="outline" className="border-gray-300 text-gray-700 gap-1.5 px-3 py-1.5">
        <AlertCircle size={16} className="text-amber-600" />
        {status}
      </Badge>
    );
  }
  return <Badge variant="outline" className="border-gray-300 text-gray-700">{status}</Badge>;
}

export default function OrderTable({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No orders found
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
    <Table>
      <TableHeader className="">
        <TableRow className="border-b hover:bg-transparent">
          <TableHead className="font-medium text-gray-600 bg-[#F7F7F7]">Order Number</TableHead>
          <TableHead className="font-medium text-gray-600 bg-[#F7F7F7]">Customer PO</TableHead>
          <TableHead className="font-medium text-gray-600 bg-[#F7F7F7]">Ship To</TableHead>
          <TableHead className="font-medium text-gray-600 bg-[#F7F7F7]">Order Date</TableHead>
          <TableHead className="font-medium text-gray-600 bg-[#F7F7F7]">Payment</TableHead>
          <TableHead className="font-medium text-gray-600 bg-[#F7F7F7]">Taken By</TableHead>
          <TableHead className="font-medium text-gray-600 bg-[#F7F7F7]">Status</TableHead>
          <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id} className="border-b hover:bg-white">
            <TableCell className="text-[#171717] font-medium">{order.orderNumber}</TableCell>
            <TableCell className="text-[#171717]">{order.customerPO}</TableCell>
            <TableCell className="text-[#171717]">{order.shipTo}</TableCell>
            <TableCell className="text-[#171717]">{order.orderDate}</TableCell>
            <TableCell className="text-[#171717]">{order.payment}</TableCell>
            <TableCell className="text-[#171717]">{order.takenBy}</TableCell>
            <TableCell>
              <StatusBadge status={order.status} />
            </TableCell>
            <TableCell className="text-right font-medium text-gray-900">{order.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}
