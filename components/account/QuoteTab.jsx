"use client";

import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronDown, Search, Filter, Plus } from "lucide-react";
import QuoteTable from "./QuoteTable";
import QuoteRequestForm from "./QuoteRequestForm";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const mockQuotes = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  serial: i + 1,
  quoteNumber: `QU-29-100941${i}`,
  orderDate: "23-04-25",
  quotedBy: "Example",
  reference: "Metelix",
  action: ["Done", "Pending", "Failed"][i % 3],
}));

export default function QuoteTab() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);

  // Quote history state
  const [query, setQuery] = useState("");
  const [perPage, setPerPage] = useState(7);
  const [page, setPage] = useState(1);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filters, setFilters] = useState({
    status: null,
    dateRange: "all",
  });

  // Quote history filtering
  const filtered = useMemo(() => {
    let result = mockQuotes;
    if (query) {
      result = result.filter((q) =>
        [q.quoteNumber, q.reference].join(" ").toLowerCase().includes(query.toLowerCase())
      );
    }
    if (filters.status) {
      result = result.filter((q) => q.action === filters.status);
    }
    return result;
  }, [query, filters]);

  const pageCount = Math.ceil(filtered.length / perPage) || 1;
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const handleFormSubmit = ({ form, lines }) => {
    console.log("Quote submitted from form component", { form, lines });
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {!showForm ? (
        // Quote History View
        <div className="space-y-4 sm:space-y-4 border p-4 sm:p-6 rounded-lg shadow-sm bg-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Quote History</h2>
            <button 
              onClick={() => setShowForm(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-700 transition"
            >
              <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>Request for Quote</span>
            </button>
          </div>

          <div className="flex flex-col gap-2 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <div className="w-full sm:flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <input
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                />
              </div>

              <div className="w-full sm:w-auto flex gap-2">
                <div className="relative flex-1 sm:flex-none">
                  <select 
                    value={filters.dateRange}
                    onChange={(e) => {
                      setFilters({
                        ...filters,
                        dateRange: e.target.value,
                      });
                      setPage(1);
                    }}
                    className="w-full appearance-none pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 rounded-lg border border-gray-300 text-gray-700 text-xs sm:text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
                  >
                    <option value="all">All Time</option>
                    <option value="last-week">Last Week</option>
                    <option value="last-month">Last Month</option>
                    <option value="last-year">Last Year</option>
                  </select>
                  <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </div>

                <div className="relative flex-1 sm:flex-none">
                  <button 
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium hover:bg-gray-50 transition"
                  >
                    <Filter size={16} className="sm:w-[18px] sm:h-[18px]" />
                    <span>Filter</span>
                  </button>

                  {showFilterMenu && (
                    <div className="absolute right-0 mt-2 w-full sm:w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
                      <div className="p-3 sm:p-4 space-y-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Status</label>
                          <div className="space-y-2">
                            {["Done", "Pending", "Failed"].map((status) => (
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
                                  className="rounded border-gray-300"
                                />
                                <span className="text-xs sm:text-sm text-gray-700">{status}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2 border-t">
                          <button
                            onClick={() => {
                              setFilters({ status: null, dateRange: "all" });
                              setPage(1);
                            }}
                            className="flex-1 px-2 sm:px-3 py-1.5 text-xs sm:text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
                          >
                            Clear
                          </button>
                          <button
                            onClick={() => setShowFilterMenu(false)}
                            className="flex-1 px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-green-500 text-white rounded hover:bg-green-600 transition"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <QuoteTable quotes={pageItems} />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 text-xs sm:text-sm">
            <div className="text-gray-600 min-w-fit order-2 sm:order-1">
              Page {page} of {pageCount}
            </div>

            <div className="overflow-x-auto order-1 sm:order-2 flex-1">
              <Pagination className="flex justify-center">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setPage((p) => Math.max(1, p - 1))} 
                      disabled={page === 1}
                      className={page === 1 ? "pointer-events-none opacity-50 text-xs sm:text-sm" : "cursor-pointer text-xs sm:text-sm"}
                    />
                  </PaginationItem>

                  {pageCount <= 5 ? (
                    Array.from({ length: pageCount }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          onClick={() => setPage(i + 1)} 
                          isActive={page === i + 1}
                          className="cursor-pointer text-xs sm:text-sm"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))
                  ) : (
                    <>
                      <PaginationItem>
                        <PaginationLink 
                          onClick={() => setPage(1)} 
                          isActive={page === 1}
                          className="cursor-pointer text-xs sm:text-sm"
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>

                      {page > 3 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      {page > 2 && (
                        <PaginationItem>
                          <PaginationLink 
                            onClick={() => setPage(page - 1)} 
                            className="cursor-pointer text-xs sm:text-sm"
                          >
                            {page - 1}
                          </PaginationLink>
                        </PaginationItem>
                      )}

                      {page !== 1 && page !== pageCount && (
                        <PaginationItem>
                          <PaginationLink 
                            isActive={true}
                            className="text-xs sm:text-sm"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )}

                      {page < pageCount - 1 && (
                        <PaginationItem>
                          <PaginationLink 
                            onClick={() => setPage(page + 1)} 
                            className="cursor-pointer text-xs sm:text-sm"
                          >
                            {page + 1}
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
                          className="cursor-pointer text-xs sm:text-sm"
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
                      className={page === pageCount ? "pointer-events-none opacity-50 text-xs sm:text-sm" : "cursor-pointer text-xs sm:text-sm"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            <div className="relative min-w-fit order-3 sm:order-3">
              <select 
                className="appearance-none pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 rounded-lg border border-gray-300 text-gray-700 text-xs sm:text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
                value={perPage}
                onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
              >
                <option value={5}>5 / page</option>
                <option value={7}>7 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
              </select>
              <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </div>
          </div>
        </div>
      ) : (
        <QuoteRequestForm 
          initialUser={user}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}
