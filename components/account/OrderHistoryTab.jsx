"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { getOrders } from "@/lib/api/services/orders";
import OrderTable from "./OrderTable";
import { ChevronDown, Search, Filter, Download, Loader } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function OrderHistoryTab() {
  const [query, setQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filters, setFilters] = useState({
    status: null,
    payment: null,
    dateRange: "all", // all, last-week, last-month, last-year
  });
  const [orders, setOrders] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exporting, setExporting] = useState(false);
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

  // Fetch orders when page, perPage, or filters change
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getOrders(page, perPage, 'orderId', 'asc', filters.status);

        if (res.success && res.data) {
          const items = res.data.items || [];

          // Transform API response to match component expectations
          const transformedOrders = items.map((order, index) => ({
            id: order.orderId,
            orderNumber: order.orderNo,
            customerPO: order.custPO || '-',
            shipTo: order.shipTo || '-',
            orderDate: new Date(order.lastUpdated).toLocaleDateString('en-CA'),
            payment: '-', // Not provided in API response
            takenBy: order.placedByName || '-',
            status: order.status,
            amount: order.orderLines?.reduce((sum, line) => sum + (line.netAmount || 0), 0).toFixed(2) || '0.00',
          }));

          setOrders(transformedOrders);
          setTotalRecords(res.data.totalRecords || 0);
          setTotalPages(res.data.totalPages || 1);
        } else {
          setError(res.error || 'Failed to fetch orders');
          toast.error(res.error || 'Failed to fetch orders');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('An error occurred while fetching orders');
        toast.error('An error occurred while fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page, perPage, filters.status]);

  // Filter orders locally by search query
  const filtered = useMemo(() => {
    let result = orders;

    // Search filter
    if (query) {
      result = result.filter((o) =>
        [o.orderNumber, o.customerPO, o.takenBy].join(" ").toLowerCase().includes(query.toLowerCase())
      );
    }

    return result;
  }, [query, orders]);

  const pageCount = totalPages;
  const pageItems = filtered;

  const handleExport = () => {
    (async () => {
      setExporting(true);
      try {
        let allItems = [];

        // If we already know totalRecords, request all in a single call
        if (totalRecords && totalRecords > 0) {
          const res = await getOrders(1, totalRecords, 'orderId', 'asc', filters.status);
          if (res.success && res.data) {
            allItems = res.data.items || [];
          } else {
            throw new Error(res.error || 'Failed to retrieve orders for export');
          }
        } else {
          // Fallback: page through results until no more items
          const pageSizeForExport = Math.max(perPage, 100);
          let pageNum = 1;
          while (true) {
            const res = await getOrders(pageNum, pageSizeForExport, 'orderId', 'asc', filters.status);
            if (!res.success || !res.data) {
              throw new Error(res.error || 'Failed to retrieve orders for export');
            }
            const items = res.data.items || [];
            allItems.push(...items);
            // Stop when we've fetched all pages or received fewer items than requested
            if (items.length < pageSizeForExport || allItems.length >= (res.data.totalRecords || Infinity)) break;
            pageNum += 1;
          }
        }

        if (allItems.length === 0) {
          toast('No orders to export');
          return;
        }

        // Build CSV: header + rows (one row per order)
        const headers = [
          'orderId',
          'orderNo',
          'custNo',
          'custPO',
          'shipTo',
          'lineCount',
          'lastUpdated',
          'placedByName',
          'placedByEmail',
          'quoteNumber',
          'status',
          'amount'
        ];

        const escapeCell = (value) => {
          if (value === null || value === undefined) return '';
          const str = String(value);
          // Escape quotes by doubling them, wrap cell in quotes if it contains comma/newline/quote
          if (/[",\n]/.test(str)) {
            return '"' + str.replace(/"/g, '""') + '"';
          }
          return str;
        };

        const rows = allItems.map((o) => {
          const amount = (o.orderLines || []).reduce((sum, l) => sum + (Number(l.netAmount) || 0), 0).toFixed(2);
          return [
            o.orderId,
            o.orderNo,
            o.custNo,
            o.custPO,
            o.shipTo,
            o.lineCount,
            o.lastUpdated,
            o.placedByName,
            o.placedByEmail,
            o.quoteNumber,
            o.status,
            amount,
          ].map(escapeCell).join(',');
        });

        const csv = [headers.join(','), ...rows].join('\n');

        // Trigger download
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `orders_export_${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        toast.success(`Exported ${allItems.length} orders`);
      } catch (err) {
        console.error('Export error:', err);
        toast.error(err.message || 'Failed to export orders');
      } finally {
        setExporting(false);
      }
    })();
  };

  return (
    <div className="w-full border bg-white rounded-lg shadow-sm border-[#EBEBEB] p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Order History</h2>
        <button
          onClick={handleExport}
          disabled={exporting}
          aria-busy={exporting}
          className={`w-full sm:w-auto flex border px-3 sm:px-4 py-2 rounded-lg items-center justify-center sm:justify-start gap-2 text-gray-700 text-xs sm:text-sm font-medium transition ${exporting ? 'opacity-60 pointer-events-none' : 'hover:text-gray-900 hover:bg-gray-50'}`}
        >
          {exporting ? (
            <>
              <Loader className="w-4 h-4 animate-spin text-green-500" />
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>Export to CSV</span>
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 mb-4">
        <div className="flex flex-row flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4">
          <div className="flex-1 min-w-0 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            <input
              className="w-full pl-9 sm:pl-10 pr-12 sm:pr-14 py-2 rounded-lg border border-[#EBEBEB] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm min-w-0 bg-white"
              placeholder="Search..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            />
            {/* keyboard shortcut hint */}
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 bg-white border border-[#EBEBEB] rounded px-2 py-0.5 hidden sm:inline-flex items-center justify-center">
              ⌘1
            </span>
          </div>

          <div className="relative w-auto" ref={filterMenuRef}>
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg shadow-sm border border-[#EBEBEB] text-gray-700 text-xs sm:text-sm font-medium hover:bg-green-50 transition"
            >
              <Filter size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>Filter</span>
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-full sm:w-64 bg-white border border-[#EBEBEB] rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
                <div className="p-3 sm:p-4 space-y-4">
                  {/* Status Filter */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Status</label>
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
                          <span className="text-xs sm:text-sm text-gray-700">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Payment Filter */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Payment</label>
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
                          <span className="text-xs sm:text-sm text-gray-700">{payment}</span>
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

          <div className="relative w-auto ml-auto">
            <select
              value={filters.dateRange}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  dateRange: e.target.value,
                });
                setPage(1);
              }}
              className="w-auto min-w-[140px] appearance-none pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 rounded-lg shadow-sm border border-[#EBEBEB] text-gray-700 text-xs sm:text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 font-medium hover:bg-green-50 transition"
            >
              <option value="all">All Time</option>
              <option value="last-week">Last Week</option>
              <option value="last-month">Last Month</option>
              <option value="last-year">Last Year</option>
            </select>
            <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          </div>
        </div>
      </div>

      {/* table data */}
      <div className="overflow-x-auto mb-6">
        {loading ? (
          <div className="flex items-center justify-center py-12 min-h-[600px]">
            <Loader className="w-6 h-6 animate-spin text-green-500" />
            <span className="ml-2 text-gray-600">Loading orders...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            {error}
          </div>
        ) : (
          <OrderTable orders={pageItems} />
        )}
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
                // Show all pages if 5 or fewer
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
                  {/* First page */}
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setPage(1)}
                      isActive={page === 1}
                      className="cursor-pointer text-xs sm:text-sm"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>

                  {/* Ellipsis if needed */}
                  {page > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {/* Current page and nearby */}
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

                  {/* Ellipsis if needed */}
                  {page < pageCount - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {/* Last page */}
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
  );
}
