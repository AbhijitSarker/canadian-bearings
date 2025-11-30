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
import { CheckCircle2, Circle, AlertCircle, X, Heart, ShoppingCart, ArrowUp, ArrowDown, ArrowUpDown, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

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
  const [addingToCart, setAddingToCart] = useState({});
  const { addItem } = useCart();
  
  if (!order) return null;

  const handleAddToCart = async (line, index) => {
    setAddingToCart(prev => ({ ...prev, [index]: true }));
    
    await addItem(
      line.productId || 0,
      line.productCode || '',
      line.qtyOrdered || 1,
      'order',
      order.orderNumber
    );
    
    setAddingToCart(prev => ({ ...prev, [index]: false }));
  };

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
                <button 
                  onClick={() => handleAddToCart(line, index)}
                  disabled={addingToCart[index]}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingToCart[index] ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <ShoppingCart size={14} />
                  )}
                  <span>{addingToCart[index] ? 'Adding...' : 'Add to Cart'}</span>
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

export default function OrderTable({ orders, sort, onSort, loading, error }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const SortIcon = ({ column }) => {
    if (!sort || sort.by !== column) return <ArrowUpDown size={14} className="ml-1 text-gray-400" />;
    return sort.direction === 'asc' ? <ArrowUp size={14} className="ml-1 text-gray-900" /> : <ArrowDown size={14} className="ml-1 text-gray-900" />;
  };

  return (
    <>
      <div className="min-h-[500px]">
        {/* Desktop Table View */}
        <div className="hidden md:block border border-gray-200 rounded-lg overflow-x-auto shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="border-b hover:bg-transparent">
                <TableHead 
                  className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => onSort && onSort('orderNo')}
                >
                  <div className="flex items-center">
                    Order Number
                    <SortIcon column="orderNo" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap">Customer PO</TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap">Ship To</TableHead>
                <TableHead 
                  className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => onSort && onSort('dateCreated')}
                >
                  <div className="flex items-center">
                    Order Date
                    <SortIcon column="dateCreated" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap">Payment</TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap">Taken By</TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-4 text-sm whitespace-nowrap">Status</TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] text-right px-4 text-sm whitespace-nowrap">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Loader2 className="w-8 h-8 animate-spin mb-2 text-green-600" />
                      <p>Loading orders...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-64 text-center text-red-500">
                    {error}
                  </TableCell>
                </TableRow>
              ) : (!orders || orders.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-64 text-center text-gray-500">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
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
                <p>Loading orders...</p>
             </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : (!orders || orders.length === 0) ? (
            <div className="text-center py-12 text-gray-500">No orders found</div>
          ) : (
            orders.map((order) => (
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
            ))
          )}
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
