"use client";

import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getSupportCases } from "@/lib/api/services/support";
import SupportCaseTable from "./SupportCaseTable";
import SupportCaseSidebar from "./SupportCaseSidebar";
import CreateCaseModal from "./CreateCaseModal";
import { ChevronDown, Search, Filter, Plus, Loader2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function CustomerSupportTab() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filters, setFilters] = useState({
    statusId: null,
    priorityId: null,
    categoryId: null,
    dateRange: "all",
    startDate: null,
    endDate: null,
  });
  const [sort, setSort] = useState({ by: 'dateCreated', direction: 'desc' });
  const [cases, setCases] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [selectedCase, setSelectedCase] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
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

  const fetchCases = async () => {
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
        search: query,
        statusId: filters.statusId,
        priorityId: filters.priorityId,
        categoryId: filters.categoryId,
        startDate: start,
        endDate: end,
      };

      const res = await getSupportCases(page, perPage, sort.by, sort.direction, apiFilters);

      if (res.success && res.data) {
        setCases(res.data.items || []);
        setTotalRecords(res.data.totalRecords || 0);
        setTotalPages(res.data.totalPages || 1);
      } else {
        setError(res.error || 'Failed to fetch cases');
        toast.error(res.error || 'Failed to fetch cases');
      }
    } catch (err) {
      console.error('Error fetching cases:', err);
      setError('An error occurred while fetching cases');
      toast.error('An error occurred while fetching cases');
    } finally {
      setLoading(false);
    }
  };

  // Fetch cases when dependencies change
  useEffect(() => {
    fetchCases();
  }, [page, perPage, filters, sort, query]);

  const handleSort = (column) => {
    setSort(prev => ({
      by: column,
      direction: prev.by === column && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    setPage(1);
  };

  return (
    <div className="w-full border bg-white rounded-lg shadow-sm border-[#EBEBEB] p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Customer Support</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2.5 sm:py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
        >
          <Plus size={18} />
          <span>Create Case</span>
        </button>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#EBEBEB] text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm bg-white"
              placeholder="Search cases..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            />
          </div>

          <div className="flex gap-3">
            <div className="relative" ref={filterMenuRef}>
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg shadow-sm border border-[#EBEBEB] text-gray-700 text-sm font-medium hover:bg-green-50 transition bg-white"
              >
                <Filter size={18} />
                <span>Filter</span>
              </button>

              {showFilterMenu && (
                <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-white border border-[#EBEBEB] rounded-lg shadow-lg z-10 max-h-[500px] overflow-y-auto mx-auto sm:mx-0">
                  <div className="p-4 space-y-4">
                    {/* Dropdown Filters */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={filters.statusId || ""}
                          onChange={(e) => setFilters({ ...filters, statusId: e.target.value || null })}
                          className="w-full px-3 py-2 border border-[#EBEBEB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">All Statuses</option>
                          <option value="1">Open</option>
                          <option value="2">In Progress</option>
                          <option value="3">Resolved</option>
                          <option value="4">Closed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select
                          value={filters.priorityId || ""}
                          onChange={(e) => setFilters({ ...filters, priorityId: e.target.value || null })}
                          className="w-full px-3 py-2 border border-[#EBEBEB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">All Priorities</option>
                          <option value="1">Low</option>
                          <option value="2">Medium</option>
                          <option value="3">High</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          value={filters.categoryId || ""}
                          onChange={(e) => setFilters({ ...filters, categoryId: e.target.value || null })}
                          className="w-full px-3 py-2 border border-[#EBEBEB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">All Categories</option>
                          <option value="1">Order Issues</option>
                          <option value="2">Product Availability</option>
                          <option value="3">Technical Support</option>
                          <option value="4">Other</option>
                        </select>
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
                    
                    {/* Clear and Apply buttons */}
                    <div className="flex gap-2 pt-2 border-t">
                      <button
                        onClick={() => {
                          setFilters({ 
                            statusId: null, 
                            priorityId: null, 
                            categoryId: null,
                            dateRange: "all",
                            startDate: null,
                            endDate: null,
                          });
                          setPage(1);
                        }}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => setShowFilterMenu(false)}
                        className="flex-1 px-3 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

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
                className="w-full sm:w-auto appearance-none pl-4 pr-10 py-2.5 rounded-lg shadow-sm border border-[#EBEBEB] text-gray-700 text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 font-medium hover:bg-green-50 transition"
              >
                <option value="all">All Time</option>
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-year">Last Year</option>
                {filters.dateRange === 'custom' && <option value="custom">Custom Range</option>}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* table data */}
      <div className="overflow-x-auto mb-6">
          <SupportCaseTable 
            cases={cases} 
            sort={sort} 
            onSort={handleSort} 
            loading={loading} 
            error={error} 
            onCaseClick={setSelectedCase}
          />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 text-xs sm:text-sm">
        <div className="text-gray-600 min-w-fit order-2 sm:order-1">
          Page {page} of {totalPages} ({totalRecords} total)
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

              {totalPages <= 5 ? (
                Array.from({ length: totalPages }).map((_, i) => (
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
                  {page > 3 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                  {page > 2 && (
                    <PaginationItem>
                      <PaginationLink onClick={() => setPage(page - 1)} className="cursor-pointer text-xs sm:text-sm">{page - 1}</PaginationLink>
                    </PaginationItem>
                  )}
                  {page !== 1 && page !== totalPages && (
                    <PaginationItem>
                      <PaginationLink isActive={true} className="text-xs sm:text-sm">{page}</PaginationLink>
                    </PaginationItem>
                  )}
                  {page < totalPages - 1 && (
                    <PaginationItem>
                      <PaginationLink onClick={() => setPage(page + 1)} className="cursor-pointer text-xs sm:text-sm">{page + 1}</PaginationLink>
                    </PaginationItem>
                  )}
                  {page < totalPages - 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setPage(totalPages)}
                      isActive={page === totalPages}
                      className="cursor-pointer text-xs sm:text-sm"
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className={page === totalPages ? "pointer-events-none opacity-50 text-xs sm:text-sm" : "cursor-pointer text-xs sm:text-sm"}
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
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
          </select>
          <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        </div>
      </div>

      {/* Sidebar for Case Details */}
      <SupportCaseSidebar 
        caseId={selectedCase?.id} 
        onClose={() => setSelectedCase(null)} 
        onUpdate={fetchCases}
      />

      {/* Create Case Modal */}
      {isCreateModalOpen && (
        <CreateCaseModal 
          onClose={() => setIsCreateModalOpen(false)} 
          onSuccess={() => {
            fetchCases();
            setPage(1);
          }} 
        />
      )}
    </div>
  );
}
