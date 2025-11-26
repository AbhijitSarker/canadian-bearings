"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronDown, Search, Filter, Plus, Loader } from "lucide-react";
import QuoteTable from "./QuoteTable";
import QuoteRequestForm from "./QuoteRequestForm";
import { getQuotes } from "@/lib/api/services/quotes";
import toast from "react-hot-toast";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function QuoteTab() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);

  // Quote history state
  const [query, setQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filters, setFilters] = useState({
    status: null,
    dateRange: "all",
    startDate: null,
    endDate: null,
  });
  const [sort, setSort] = useState({ by: 'createdDate', direction: 'desc' });
  const [quotes, setQuotes] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const filterMenuRef = useRef(null);

  // Close filter menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
        setShowFilterMenu(false);
      }
    };

    if (showFilterMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showFilterMenu]);

  // Fetch quotes
  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      setError(null);
      try {
        // Calculate date range based on preset or custom
        let start = filters.startDate;
        let end = filters.endDate;

        if (filters.dateRange !== 'custom' && filters.dateRange !== 'all') {
          const now = new Date();
          end = now.toISOString();
          
          const d = new Date();
          if (filters.dateRange === 'last-week') d.setDate(d.getDate() - 7);
          if (filters.dateRange === 'last-month') d.setMonth(d.getMonth() - 1);
          if (filters.dateRange === 'last-year') d.setFullYear(d.getFullYear() - 1);
          start = d.toISOString();
        }

        const apiFilters = {
          status: filters.status,
          startDate: start,
          endDate: end,
        };

        const res = await getQuotes(page, perPage, sort.by, sort.direction, apiFilters);

        if (res.success && res.data) {
          setQuotes(res.data.items || []);
          setTotalRecords(res.data.totalRecords || 0);
          setTotalPages(res.data.totalPages || 1);
        } else {
          setError(res.error || 'Failed to fetch quotes');
          toast.error(res.error || 'Failed to fetch quotes');
        }
      } catch (err) {
        console.error('Error fetching quotes:', err);
        setError('An error occurred while fetching quotes');
        toast.error('An error occurred while fetching quotes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [page, perPage, filters.status, filters.dateRange, filters.startDate, filters.endDate, sort]);

  const handleSort = (column) => {
    setSort(prev => ({
      by: column,
      direction: prev.by === column && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    setPage(1);
  };

  const pageCount = totalPages;

  const handleFormSubmit = ({ form, lines }) => {
    console.log("Quote submitted from form component", { form, lines });
    // Ideally refresh the list here
    // setPage(1); // Trigger refresh
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
              {/* Search is currently client-side only or disabled if not supported by API for generic query */}
              {/* Keeping the UI but disabling functionality or making it clear it might not work as expected without API support */}
              {/* Actually, user didn't provide search param in body, so I'll hide it or keep it visual only for now? */}
              {/* I'll keep it but maybe it won't do anything for now as per plan, or I can filter locally if the list is small, but with pagination it's tricky. */}
              {/* I'll remove the search input for now as it's not in the API specs provided. */}
              
              <div className="w-full sm:w-auto flex gap-2 ml-auto">
                 <div className="relative flex-1 sm:flex-none">
                  <select 
                    value={filters.dateRange}
                    onChange={(e) => {
                      setFilters({
                        ...filters,
                        dateRange: e.target.value,
                        startDate: null,
                        endDate: null,
                      });
                      setPage(1);
                    }}
                    className="w-full appearance-none pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 rounded-lg border border-gray-300 text-gray-700 text-xs sm:text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
                  >
                    <option value="all">All Time</option>
                    <option value="last-week">Last Week</option>
                    <option value="last-month">Last Month</option>
                    <option value="last-year">Last Year</option>
                    {filters.dateRange === 'custom' && <option value="custom">Custom Range</option>}
                  </select>
                  <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </div>

                <div className="relative flex-1 sm:flex-none" ref={filterMenuRef}>
                  <button 
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium hover:bg-gray-50 transition"
                  >
                    <Filter size={16} className="sm:w-[18px] sm:h-[18px]" />
                    <span>Filter</span>
                  </button>

                  {showFilterMenu && (
                    <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-[500px] overflow-y-auto">
                      <div className="p-3 sm:p-4 space-y-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Status</label>
                          <div className="space-y-2">
                            {["Processed", "Pending", "Failed"].map((status) => (
                              <label key={status} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="status"
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

                         {/* Date Range Custom Inputs */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <input
                              type="date"
                              value={filters.startDate ? filters.startDate.split('T')[0] : ''}
                              onChange={(e) => setFilters({ 
                                ...filters, 
                                dateRange: 'custom',
                                startDate: e.target.value ? new Date(e.target.value).toISOString() : null 
                              })}
                              className="w-full px-2 py-2 border border-[#EBEBEB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <input
                              type="date"
                              value={filters.endDate ? filters.endDate.split('T')[0] : ''}
                              onChange={(e) => setFilters({ 
                                ...filters, 
                                dateRange: 'custom',
                                endDate: e.target.value ? new Date(e.target.value).toISOString() : null 
                              })}
                              className="w-full px-2 py-2 border border-[#EBEBEB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2 border-t">
                          <button
                            onClick={() => {
                              setFilters({ 
                                status: null, 
                                dateRange: "all",
                                startDate: null,
                                endDate: null
                              });
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
            <QuoteTable 
              quotes={quotes} 
              sort={sort} 
              onSort={handleSort} 
              loading={loading} 
              error={error}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 text-xs sm:text-sm">
            <div className="text-gray-600 min-w-fit order-2 sm:order-1">
              Page {page} of {pageCount} ({totalRecords} total)
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
