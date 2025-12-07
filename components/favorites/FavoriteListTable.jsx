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
import { ArrowUp, ArrowDown, ArrowUpDown, Loader2, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default function FavoriteListTable({ lists, sort, onSort, loading, onDelete }) {
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
                  className="font-medium text-gray-600 bg-[#F7F7F7] px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => onSort && onSort('name')}
                >
                  <div className="flex items-center">
                    List Name
                    <SortIcon column="name" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap w-1/3">
                  Description
                </TableHead>
                <TableHead 
                  className="font-medium text-gray-600 bg-[#F7F7F7] px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => onSort && onSort('dateCreated')}
                >
                  <div className="flex items-center">
                    Created Date
                    <SortIcon column="dateCreated" />
                  </div>
                </TableHead>
                <TableHead className="font-medium text-gray-600 bg-[#F7F7F7] px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Loader2 className="w-8 h-8 animate-spin mb-2 text-green-600" />
                      <p>Loading lists...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (!lists || lists.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-64 text-center text-gray-500">
                    No favorite lists found
                  </TableCell>
                </TableRow>
              ) : (
                lists.map((list) => (
                  <TableRow 
                    key={list.id} 
                    className="border-b hover:bg-green-50/50 transition-colors group"
                  >
                    <TableCell className="text-[#171717] font-medium py-2 sm:py-3 px-2 sm:px-4 align-middle text-xs sm:text-sm">
                      <Link href={`/favorites/${list.id}`} className="hover:text-green-600 hover:underline">
                        {list.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-[#171717] py-2 sm:py-3 px-2 sm:px-4 align-middle text-xs sm:text-sm">
                      <span className="line-clamp-1" title={list.description}>
                        {list.description || '-'}
                      </span>
                    </TableCell>
                    <TableCell className="text-[#171717] py-2 sm:py-3 px-2 sm:px-4 align-middle text-xs sm:text-sm whitespace-nowrap">
                      {list.dateCreated ? new Date(list.dateCreated).toLocaleDateString('en-CA') : '-'}
                    </TableCell>
                    <TableCell className="py-2 sm:py-3 px-2 sm:px-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/favorites/${list.id}`}
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition"
                          title="View List"
                        >
                          <Eye size={16} />
                        </Link>
                        <button 
                          onClick={() => onDelete(list.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition"
                          title="Delete List"
                        >
                          <Trash2 size={16} />
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
                <p>Loading lists...</p>
             </div>
          ) : (!lists || lists.length === 0) ? (
            <div className="text-center py-12 text-gray-500">No favorite lists found</div>
          ) : (
            lists.map((list) => (
              <div 
                key={list.id} 
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3 active:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <Link href={`/favorites/${list.id}`} className="font-semibold text-gray-900 hover:text-green-600">
                      {list.name}
                    </Link>
                    <div className="text-xs text-gray-500 mt-1">
                      {list.dateCreated ? new Date(list.dateCreated).toLocaleDateString('en-CA') : '-'}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Link 
                      href={`/favorites/${list.id}`}
                      className="p-2 text-gray-400 hover:text-green-600"
                    >
                      <Eye size={18} />
                    </Link>
                    <button 
                      onClick={() => onDelete(list.id)}
                      className="p-2 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                {list.description && (
                  <div className="text-sm text-gray-600 border-t border-gray-100 pt-2 mt-2">
                    {list.description}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
