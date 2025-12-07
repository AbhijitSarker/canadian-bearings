"use client";

import { useState, useEffect } from "react";
import { 
  searchGLCodes, 
  createGLCode, 
  updateGLCode, 
  deleteGLCode, 
  updateGLCodeStatus 
} from "@/lib/api/services/glcodes";
import toast from "react-hot-toast";
import { 
  ChevronDown, 
  Search, 
  Plus, 
  Loader2,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  CheckCircle2,
  Circle,
  AlertCircle
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

export default function GLCodesTab() {
  const [glCodes, setGlCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCode, setEditingCode] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true
  });

  // Pagination & Sorting State
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState({ by: 'dateUpdated', direction: 'desc' });

  const fetchGLCodes = async () => {
    setLoading(true);
    try {
      const res = await searchGLCodes({
        search: searchQuery,
        pageNumber: page,
        pageSize: perPage,
        sortBy: sort.by,
        sortDirection: sort.direction
      });
      if (res.success) {
        setGlCodes(res.data.items || []);
        setTotalRecords(res.data.totalRecords || 0);
        setTotalPages(res.data.totalPages || 1);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error("Error fetching GL codes:", error);
      toast.error("Failed to load GL codes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setPage(1); // Reset to page 1 on search change
      fetchGLCodes();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  useEffect(() => {
    fetchGLCodes();
  }, [page, perPage, sort]);

  const handleSort = (column) => {
    setSort(prev => ({
      by: column,
      direction: prev.by === column && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    setPage(1);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingCode) {
        res = await updateGLCode(editingCode.id, formData);
      } else {
        res = await createGLCode(formData);
      }

      if (res.success) {
        toast.success(editingCode ? "GL Code updated successfully" : "GL Code created successfully");
        setIsModalOpen(false);
        setEditingCode(null);
        setFormData({ name: "", description: "", isActive: true });
        fetchGLCodes();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error("Error saving GL code:", error);
      toast.error("Failed to save GL code");
    }
  };

  const handleEdit = (code) => {
    setEditingCode(code);
    setFormData({
      name: code.name,
      description: code.description,
      isActive: code.isActive
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this GL Code?")) return;
    
    try {
      const res = await deleteGLCode(id);
      if (res.success) {
        toast.success("GL Code deleted successfully");
        fetchGLCodes();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error("Error deleting GL code:", error);
      toast.error("Failed to delete GL code");
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const res = await updateGLCodeStatus(id, !currentStatus);
      if (res.success) {
        toast.success("Status updated successfully");
        fetchGLCodes();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const openNewModal = () => {
    setEditingCode(null);
    setFormData({ name: "", description: "", isActive: true });
    setIsModalOpen(true);
  };

  const SortIcon = ({ column }) => {
    if (!sort || sort.by !== column) return <ArrowUpDown size={14} className="ml-1 text-gray-400" />;
    return sort.direction === 'asc' ? <ArrowUp size={14} className="ml-1 text-gray-900" /> : <ArrowDown size={14} className="ml-1 text-gray-900" />;
  };

  const pageCount = totalPages;

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      <div className="space-y-4 sm:space-y-4 border p-4 sm:p-6 rounded-lg shadow-sm bg-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">GL Codes</h2>
          <button 
            onClick={openNewModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-700 transition"
          >
            <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span>Add GL Code</span>
          </button>
        </div>

        <div className="flex flex-col gap-2 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                placeholder="Search GL Codes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm"
              />
              <Search
                className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mb-6">
          <div className="min-h-[400px]">
            <div className="border border-gray-200 rounded-lg overflow-x-auto shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F7F7F7] text-gray-600 font-medium border-b border-gray-200">
                  <tr>
                    <th 
                      className="px-6 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        Name
                        <SortIcon column="name" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('description')}
                    >
                      <div className="flex items-center">
                        Description
                        <SortIcon column="description" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('isActive')}
                    >
                      <div className="flex items-center">
                        Status
                        <SortIcon column="isActive" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('dateUpdated')}
                    >
                      <div className="flex items-center">
                        Last Updated
                        <SortIcon column="dateUpdated" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Loader2 className="w-8 h-8 animate-spin mb-2 text-green-600" />
                          <p>Loading GL Codes...</p>
                        </div>
                      </td>
                    </tr>
                  ) : glCodes.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                        No GL Codes found.
                      </td>
                    </tr>
                  ) : (
                    glCodes.map((code) => (
                      <tr key={code.id} className="hover:bg-green-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{code.name}</td>
                        <td className="px-6 py-4 text-gray-600">{code.description || "-"}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleStatusToggle(code.id, code.isActive)}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              code.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {code.isActive ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {code.dateUpdated ? new Date(code.dateUpdated).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) : "-"}
                        </td>
                        <td className="px-6 py-4 text-right space-x-3">
                          <button
                            onClick={() => handleEdit(code)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(code.id)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
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
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
              <option value={50}>50 / page</option>
            </select>
            <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {editingCode ? "Edit GL Code" : "Add New GL Code"}
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          rows="3"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          id="isActive"
                          name="isActive"
                          type="checkbox"
                          checked={formData.isActive}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                          Active
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
