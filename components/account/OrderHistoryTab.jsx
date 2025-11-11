"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import OrderTable from "./OrderTable";
import { ChevronDown, Search, Filter, Download, X } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const mockOrders = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  orderNumber: `SO-29-1006${i}`,
  customerPO: "Gambini Consu...",
  shipTo: "29",
  orderDate: "23-04-25",
  payment: "Cash",
  takenBy: "Neil Newman",
  status: ["Billed", "Partially Fulfilled", "Pending Fulfillment"][i % 3],
  amount: "$ 34.99",
}));

export default function OrderHistoryTab() {
  const [query, setQuery] = useState("");
  const [perPage, setPerPage] = useState(7);
  const [page, setPage] = useState(1);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filters, setFilters] = useState({
    status: null,
    payment: null,
    dateRange: "all", // all, last-week, last-month, last-year
  });

  const filtered = useMemo(() => {
    let result = mockOrders;

    // Search filter
    if (query) {
      result = result.filter((o) =>
        [o.orderNumber, o.customerPO, o.takenBy].join(" ").toLowerCase().includes(query.toLowerCase())
      );
    }

    // Status filter
    if (filters.status) {
      result = result.filter((o) => o.status === filters.status);
    }

    // Payment filter
    if (filters.payment) {
      result = result.filter((o) => o.payment === filters.payment);
    }

    return result;
  }, [query, filters]);

  const pageCount = Math.ceil(filtered.length / perPage) || 1;
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const handleExport = () => {
    toast.success("Export to CSV coming soon");
  };

  return (
    <div className="w-full border bg-white p-6 rounded-lg shadow-sm border-[#EBEBEB]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Order History</h2>
        <button 
          onClick={handleExport} 
          className="flex border px-4 py-2 rounded-lg items-center gap-2 text-gray-700 hover:text-gray-900 text-sm font-medium"
        >
          <Download size={18} />
          Export to CSV
        </button>
      </div>

      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex-1 relative ">
          <Search className="absolute  left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            className="w-full pl-10 shadow-sm pr-4 py-2 rounded-lg border border-[#EBEBEB] text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          />
        </div>



        <div className="relative">
          <button 
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm border border-[#EBEBEB] text-gray-700 text-sm font-medium hover:bg-green-50"
          >
            <Filter size={18} />
            Filter
          </button>

          {showFilterMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-[#EBEBEB] rounded-lg shadow-lg z-10">
              <div className="p-4 space-y-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="space-y-2">
                    {["Billed", "Partially Fulfilled", "Pending Fulfillment"].map((status) => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.status === status}
                          onChange={(e) => {
                            setFilters({
                              ...filters,
                              status: e.target.checked ? status : null,
                            });
                            setPage(1);
                          }}
                          className="rounded border-[#EBEBEB]"
                        />
                        <span className="text-sm text-gray-700">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment</label>
                  <div className="space-y-2">
                    {["Cash", "Card", "Check", "Other"].map((payment) => (
                      <label key={payment} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.payment === payment}
                          onChange={(e) => {
                            setFilters({
                              ...filters,
                              payment: e.target.checked ? payment : null,
                            });
                            setPage(1);
                          }}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">{payment}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear and Apply buttons */}
                <div className="flex gap-2 pt-2 border-t">
                  <button
                    onClick={() => {
                      setFilters({ status: null, payment: null, dateRange: "all" });
                      setPage(1);
                    }}
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setShowFilterMenu(false)}
                    className="flex-1 px-3 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <select
            value={filters.dateRange}
            onChange={(e) => {
              setFilters({
                ...filters,
                dateRange: e.target.value,
              });
              setPage(1);
            }}
            className="appearance-none pl-4 pr-10 py-2 rounded-lg shadow-sm border border-[#EBEBEB] text-gray-700 text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 font-medium hover:bg-green-50"
          >
            <option value="all">All Time</option>
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
            <option value="last-year">Last Year</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
        </div>
      </div>

      <div className="mb-6">
        <OrderTable orders={pageItems} />
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className="text-sm text-gray-600 min-w-fit">
          Page {page} of {pageCount}
        </div>

        <Pagination className="flex-1 justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setPage((p) => Math.max(1, p - 1))} 
                disabled={page === 1}
                className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {pageCount <= 5 ? (
              // Show all pages if 5 or fewer
              Array.from({ length: pageCount }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    onClick={() => setPage(i + 1)} 
                    isActive={page === i + 1}
                    className="cursor-pointer"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))
            ) : (
              // Show first, middle, last with ellipsis
              <>
                <PaginationItem>
                  <PaginationLink 
                    onClick={() => setPage(1)} 
                    isActive={page === 1}
                    className="cursor-pointer"
                  >
                    1
                  </PaginationLink>
                </PaginationItem>

                {page > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {page > 2 && page < pageCount - 1 && (
                  <PaginationItem>
                    <PaginationLink 
                      onClick={() => setPage(page)} 
                      isActive={true}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {page < pageCount - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationLink 
                    onClick={() => setPage(pageCount)} 
                    isActive={page === pageCount}
                    className="cursor-pointer"
                  >
                    {pageCount}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext 
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={page === pageCount}
                className={page === pageCount ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <div className="relative min-w-fit">
          <select 
            className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
            value={perPage}
            onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
          >
            <option value={5}>5 / page</option>
            <option value={7}>7 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
        </div>
      </div>
    </div>
  );
}
