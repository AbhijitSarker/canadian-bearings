"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import OrderTable from "./OrderTable";
import { ChevronDown, Search, Filter, Download } from "lucide-react";

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

  const filtered = useMemo(() => {
    if (!query) return mockOrders;
    return mockOrders.filter((o) =>
      [o.orderNumber, o.customerPO, o.takenBy].join(" ").toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const pageCount = Math.ceil(filtered.length / perPage) || 1;
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const handleExport = () => {
    toast.success("Export to CSV coming soon");
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Order History</h2>
        <button 
          onClick={handleExport} 
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 text-sm font-medium"
        >
          <Download size={18} />
          Export to CSV
        </button>
      </div>

      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          />
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50">
          <Filter size={18} />
          Filter
        </button>

        <div className="relative">
          <select 
            className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={perPage} 
            onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
          >
            <option value={7}>7 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 pointer-events-none" size={18} />
        </div>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <OrderTable orders={pageItems} />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">Page {page} of {pageCount}</div>

        <div className="flex items-center gap-1">
          <button 
            onClick={() => setPage((p) => Math.max(1, p - 1))} 
            disabled={page === 1}
            className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ◀
          </button>
          
          {/* Page numbers with ellipsis */}
          {pageCount <= 5 ? (
            // Show all pages if 5 or fewer
            Array.from({ length: pageCount }).map((_, i) => (
              <button 
                key={i} 
                onClick={() => setPage(i + 1)} 
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                  page === i + 1 
                    ? 'bg-gray-800 text-white' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))
          ) : (
            // Show first, middle, last with ellipsis
            <>
              <button 
                onClick={() => setPage(1)} 
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                  page === 1 
                    ? 'bg-gray-800 text-white' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                1
              </button>
              
              {page > 3 && (
                <span className="text-gray-500 text-sm">...</span>
              )}
              
              {page > 2 && page < pageCount - 1 && (
                <button 
                  onClick={() => setPage(page)} 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium bg-gray-800 text-white"
                >
                  {page}
                </button>
              )}
              
              {page < pageCount - 2 && (
                <span className="text-gray-500 text-sm">...</span>
              )}
              
              <button 
                onClick={() => setPage(pageCount)} 
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                  page === pageCount 
                    ? 'bg-gray-800 text-white' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {pageCount}
              </button>
            </>
          )}
          
          <button 
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
            className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}
