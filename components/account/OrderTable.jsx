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
import { CheckCircle2, Circle, AlertCircle, X, Heart, ShoppingCart } from "lucide-react";

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

function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 transition-opacity" onClick={onClose}>
      <div 
        className="w-full max-w-md h-full bg-white shadow-xl overflow-y-auto flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">History</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-6 flex-1">
          {order.orderLines && order.orderLines.map((line, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 space-y-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center">
                  {/* Placeholder image since we don't have real URLs yet */}
                  <img src="/placeholder-product.png" alt="Product" className="w-16 h-16 object-contain opacity-50" onError={(e) => e.target.style.display = 'none'} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
                    {line.productCode || line.description1 || "Unknown Product"}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                    {line.description1 || line.description2}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-gray-900">${line.price?.toFixed(2)}</span>
                    <span className="text-xs text-gray-500">/{line.uom?.replace('pack of ', '') || 'each'}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 bg-orange-50/50 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Total Price</div>
                  <div className="text-xs font-semibold text-gray-900">${line.netAmount?.toFixed(2)}</div>
                </div>
                <div className="text-center border-l border-gray-200">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Ordered</div>
                  <div className="text-xs font-semibold text-gray-900">{line.qtyOrdered} Paces</div>
                </div>
                <div className="text-center border-l border-gray-200">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Shipped</div>
                  <div className="text-xs font-semibold text-gray-900">{line.qtyShipped}</div>
                </div>
                <div className="text-center border-l border-gray-200">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Fulfillment</div>
                  <div className="text-[10px] font-medium text-gray-900 leading-tight">
                    {line.fulfillments?.length > 0 ? 'Shipped' : (line.promiseDate ? new Date(line.promiseDate).toLocaleDateString() : 'Pending')}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition">
                  <Heart size={14} />
                  <span>Add to Favorite</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition shadow-sm">
                  <ShoppingCart size={14} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
          
          {(!order.orderLines || order.orderLines.length === 0) && (
             <div className="text-center py-8 text-gray-500 text-sm">No line items found for this order.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OrderTable({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-6 sm:py-8 text-gray-500 text-xs sm:text-sm">
        No orders found
      </div>
    );
  }

  return (
    <>
      <div className="min-h-[500px]">
        {/* Desktop Table View */}
        <div className="hidden md:block border border-gray-200 rounded-lg overflow-x-auto shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap">Order Number</TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap">Customer PO</TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap">Ship To</TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap">Order Date</TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap">Payment</TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap">Taken By</TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap">Status</TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] text-right px-4 text-sm whitespace-nowrap">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow 
                  key={order.id} 
                  className="border-b hover:bg-green-50/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedOrder(order)}
                >
                  <TableCell className="text-[#171717] font-medium py-3 px-4 align-middle text-sm">{order.orderNumber}</TableCell>
                  <TableCell className="text-[#171717] py-3 px-4 align-middle text-sm">{order.customerPO}</TableCell>
                  <TableCell className="text-[#171717] py-3 px-4 align-middle text-sm">{order.shipTo}</TableCell>
                  <TableCell className="text-[#171717] py-3 px-4 align-middle text-sm whitespace-nowrap">{order.orderDate}</TableCell>
                  <TableCell className="text-[#171717] py-3 px-4 align-middle text-sm">{order.payment}</TableCell>
                  <TableCell className="text-[#171717] py-3 px-4 align-middle text-sm">{order.takenBy}</TableCell>
                  <TableCell className="py-3 px-4 align-middle">
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-900 py-3 px-4 align-middle text-sm whitespace-nowrap">{order.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3 active:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-900">{order.orderNumber}</div>
                  <div className="text-xs text-gray-500 mt-1">{order.orderDate}</div>
                </div>
                <StatusBadge status={order.status} />
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <span className="text-gray-500 text-xs block">PO Number</span>
                  <span className="text-gray-900 font-medium">{order.customerPO}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 text-xs block">Amount</span>
                  <span className="text-gray-900 font-bold">{order.amount}</span>
                </div>
                
                <div className="col-span-2 pt-2 border-t border-gray-100 mt-2">
                  <span className="text-gray-500 text-xs block">Ship To</span>
                  <span className="text-gray-700">{order.shipTo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </>
  );
}
