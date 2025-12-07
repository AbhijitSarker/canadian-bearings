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
import { ArrowUp, ArrowDown, ArrowUpDown, Loader2, Trash2, ShoppingCart, Minus, Plus } from "lucide-react";
import Image from "next/image";

export default function FavoriteItemsTable({ items, sort, onSort, loading, onRemove, onAddToCart, removingId }) {
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
                <TableHead className="w-[100px] bg-[#F7F7F7] px-4">Image</TableHead>
                <TableHead 
                  className="font-medium text-gray-600 bg-[#F7F7F7] px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => onSort && onSort('sku')}
                >
                  <div className="flex items-center">
                    Product Details
                    <SortIcon column="sku" />
                  </div>
                </TableHead>
                <TableHead 
                  className="font-medium text-gray-600 bg-[#F7F7F7] px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => onSort && onSort('dateCreated')}
                >
                  <div className="flex items-center">
                    Date Added
                    <SortIcon column="dateCreated" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap text-right">
                  Price
                </TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Loader2 className="w-8 h-8 animate-spin mb-2 text-green-600" />
                      <p>Loading items...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (!items || items.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center text-gray-500">
                    No items found in this list
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow 
                    key={item.id} 
                    className="border-b hover:bg-green-50/50 transition-colors group"
                  >
                    <TableCell className="p-4 align-middle">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                         {/* Placeholder or actual image */}
                         <div className="text-gray-400 text-[10px] text-center p-1">No Image</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#171717] py-2 sm:py-3 px-2 sm:px-4 align-middle text-xs sm:text-sm">
                      <div>
                        <div className="font-semibold text-gray-900">{item.cbSku || item.sku || 'Unknown SKU'}</div>
                        <div className="text-gray-500 text-xs mt-1 line-clamp-1">{item.description || 'No description'}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#171717] py-2 sm:py-3 px-2 sm:px-4 align-middle text-xs sm:text-sm whitespace-nowrap">
                      {item.dateCreated ? new Date(item.dateCreated).toLocaleDateString('en-CA') : '-'}
                    </TableCell>
                    <TableCell className="text-[#171717] py-2 sm:py-3 px-2 sm:px-4 align-middle text-right text-xs sm:text-sm font-medium">
                      $31.89 <span className="text-gray-400 font-normal">/ea</span>
                    </TableCell>
                    <TableCell className="py-2 sm:py-3 px-2 sm:px-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => onAddToCart(item)}
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition"
                          title="Add to Cart"
                        >
                          <ShoppingCart size={16} />
                        </button>
                        <button 
                          onClick={() => onRemove(item.id)}
                          disabled={removingId === item.id}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition disabled:opacity-50"
                          title="Remove Item"
                        >
                          {removingId === item.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                        </button>
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
                <p>Loading items...</p>
             </div>
          ) : (!items || items.length === 0) ? (
            <div className="text-center py-12 text-gray-500">No items found</div>
          ) : (
            items.map((item) => (
              <div 
                key={item.id} 
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3 active:bg-gray-50 transition-colors"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200">
                     <div className="text-gray-400 text-[10px] text-center p-1">No Image</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">{item.cbSku || item.sku}</div>
                    <div className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</div>
                    <div className="mt-2 font-medium text-gray-900">$31.89 <span className="text-gray-400 font-normal text-xs">/ea</span></div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button 
                    onClick={() => onAddToCart(item)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
                  >
                    <ShoppingCart size={16} />
                    Add
                  </button>
                  <button 
                    onClick={() => onRemove(item.id)}
                    disabled={removingId === item.id}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition disabled:opacity-50"
                  >
                    {removingId === item.id ? <Loader2 size={16} className="animate-spin" /> : <><Trash2 size={16} /> Remove</>}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
