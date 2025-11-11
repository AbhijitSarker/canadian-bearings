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
    <div className="w-full space-y-6">
      {!showForm ? (
        // Quote History View
        <div className="space-y-4 border p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">Quote History</h2>
            <button 
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
            >
              <Plus size={18} />
              Request for Quote
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Search..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              />
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
                className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
              >
                <option value="all">All Time</option>
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-year">Last Year</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50"
              >
                <Filter size={18} />
                Filter
              </button>

              {showFilterMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
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
                            <span className="text-sm text-gray-700">{status}</span>
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
          </div>

          <div className="mb-6">
            <QuoteTable quotes={pageItems} />
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
                value={perPage}
                onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
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
