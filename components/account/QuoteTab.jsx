"use client";

import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { ChevronDown, Search, Filter, Plus } from "lucide-react";
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

  // Request form state
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneCountryCode: "+1",
    phoneNumber: "(555) 000-0000",
    comment: "",
  });

  const [lines, setLines] = useState([
    { id: 1, part: "", description: "", qty: "", file: null },
    { id: 2, part: "", description: "", qty: "", file: null },
    { id: 3, part: "", description: "", qty: "", file: null },
    { id: 4, part: "", description: "", qty: "", file: null },
  ]);

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

  // Form handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const addLine = () => {
    setLines((prev) => [
      ...prev,
      { id: prev.length ? prev[prev.length - 1].id + 1 : 1, part: "", description: "", qty: "", file: null },
    ]);
  };

  const removeLine = (id) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  };

  const updateLine = (id, key, value) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, [key]: value } : l)));
  };

  const handleFile = (id, file) => {
    updateLine(id, "file", file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email) {
      toast.error("Please enter your email.");
      return;
    }
    toast.success("Quote request submitted — our team will contact you shortly.");
    console.log("Quote submitted", { form, lines });
    setShowForm(false);
    // Reset form
    setForm({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneCountryCode: "+1",
      phoneNumber: "(555) 000-0000",
      comment: "",
    });
    setLines([
      { id: 1, part: "", description: "", qty: "", file: null },
      { id: 2, part: "", description: "", qty: "", file: null },
      { id: 3, part: "", description: "", qty: "", file: null },
      { id: 4, part: "", description: "", qty: "", file: null },
    ]);
  };

  const getActionColor = (action) => {
    if (action === "Done") return "text-green-600";
    if (action === "Pending") return "text-orange-600";
    if (action === "Failed") return "text-red-600";
    return "text-gray-600";
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

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#F7F7F7] border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Serial</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Quote Number</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Order Date</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Quoted By</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Reference</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      No quotes found
                    </td>
                  </tr>
                ) : (
                  pageItems.map((quote) => (
                    <tr key={quote.id} className="border-b hover:bg-gray-50 align-middle">
                      <td className="px-4 py-3 text-gray-900">{quote.serial}</td>
                      <td className="px-4 py-3 text-gray-900 font-medium">{quote.quoteNumber}</td>
                      <td className="px-4 py-3 text-gray-900">{quote.orderDate}</td>
                      <td className="px-4 py-3 text-gray-900">{quote.quotedBy}</td>
                      <td className="px-4 py-3 text-gray-900">{quote.reference}</td>
                      <td className={`px-4 py-3 font-medium ${getActionColor(quote.action)}`}>
                        ● {quote.action}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
                className="appearance-none pl-4 pr-10 py-2 rounded-full border border-gray-300 text-gray-700 text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
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
        <form className="space-y-6 border p-6 rounded-lg shadow-sm" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-900">Request for Quote</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="First name"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Last name"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative mt-1">
                <input
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                    className="block w-full rounded-md border border-gray-200 px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="hello@example.com"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <div className="flex items-center gap-2 mt-1">
                <select
                  name="phoneCountryCode"
                  value={form.phoneCountryCode}
                  onChange={handleFormChange}
                    className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleFormChange}
                    className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="(555) 000-0000"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Comment</label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Placeholder text..."
            />
          </div>

          {/* Quote lines table */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Serial</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Part</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Description</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Qty</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Upload Image (jpg / pdf)</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((line, idx) => (
                  <tr key={line.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900 align-middle">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <input
                        value={line.part}
                        onChange={(e) => updateLine(line.id, "part", e.target.value)}
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Part"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        value={line.description}
                        onChange={(e) => updateLine(line.id, "description", e.target.value)}
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Description"
                      />
                    </td>
                    <td className="px-4 py-3 w-24">
                      <input
                        value={line.qty}
                        onChange={(e) => updateLine(line.id, "qty", e.target.value)}
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Qty"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <label className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-md cursor-pointer text-sm font-medium hover:bg-green-700">
                          + Upload
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) => handleFile(line.id, e.target.files?.[0] || null)}
                            className="hidden"
                          />
                        </label>
                        <span className="text-gray-500 text-xs">{line.file ? line.file.name : ""}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => removeLine(line.id)}
                        className="text-red-500 hover:text-red-700 text-lg"
                        aria-label={`Remove line ${idx + 1}`}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-4">
            <button 
              type="button" 
              onClick={addLine} 
              className="px-4 py-2 rounded-md border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Add Line
            </button>

            <div className="ml-auto flex items-center gap-3">
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500">Please fill out the above form to connect directly with our sales team. Alternatively, you may email your request to sales@canadianbearings.com or call 905-670-6700</p>
        </form>
      )}
    </div>
  );
}
