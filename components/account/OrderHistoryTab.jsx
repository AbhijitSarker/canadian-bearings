"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";

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

function StatusBadge({ status }) {
  const map = {
    "Billed": "bg-green-100 text-green-700",
    "Partially Fulfilled": "bg-blue-100 text-blue-700",
    "Pending Fulfillment": "bg-amber-100 text-amber-700",
  };
  return (
    <span className={`${map[status] || "bg-gray-100 text-gray-700"} text-xs px-2 py-1 rounded-full`}>{status}</span>
  );
}

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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-medium text-gray-900">Order History</h2>
        <div className="flex items-center gap-2">
          <button onClick={handleExport} className="px-4 py-2 rounded-md border border-gray-200 text-sm">Export to CSV</button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <input
            className="w-full rounded-md border border-gray-200 px-4 py-2 text-sm"
            placeholder="Search..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-md border border-gray-200 text-sm">Filter</button>
          <select className="rounded-md border border-gray-200 px-3 py-2 text-sm" value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}>
            <option value={7}>7 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Order Number</th>
              <th className="p-3 text-left">Customer PO</th>
              <th className="p-3 text-left">Ship To</th>
              <th className="p-3 text-left">Order Date</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Taken By</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="p-3">{o.orderNumber}</td>
                <td className="p-3">{o.customerPO}</td>
                <td className="p-3">{o.shipTo}</td>
                <td className="p-3">{o.orderDate}</td>
                <td className="p-3">{o.payment}</td>
                <td className="p-3">{o.takenBy}</td>
                <td className="p-3"><StatusBadge status={o.status} /></td>
                <td className="p-3 text-right">{o.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">Page {page} of {pageCount}</div>

        <div className="flex items-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-2 py-1 rounded-md border border-gray-200">◀</button>
          {Array.from({ length: pageCount }).map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`w-8 h-8 rounded-full ${page === i + 1 ? 'bg-gray-800 text-white' : 'bg-white border border-gray-200'}`}>{i + 1}</button>
          ))}
          <button onClick={() => setPage((p) => Math.min(pageCount, p + 1))} className="px-2 py-1 rounded-md border border-gray-200">▶</button>
        </div>
      </div>
    </div>
  );
}
