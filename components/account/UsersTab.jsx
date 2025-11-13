"use client";

import { useState, useEffect } from "react";
import { authenticatedFetch, debugAuth } from "@/lib/auth";
import toast from "react-hot-toast";

export default function UsersTab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("email");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  // Debug auth on component mount
  useEffect(() => {
    console.log('[UsersTab] Component mounted, checking auth...');
    debugAuth();
  }, []);

  // Fetch users data
  useEffect(() => {
    fetchUsers();
  }, [pageNumber, pageSize, sortBy, sortDirection, searchQuery]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        sortBy: sortBy,
        sortDirection: sortDirection,
      });

      if (searchQuery) {
        params.append("searchQuery", searchQuery);
      }

      const url = `https://cbmro.com/copdev-api/api/users?${params.toString()}`;
      console.log('[UsersTab] Fetching users from:', url);

      const response = await authenticatedFetch(url);

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        console.error(`[UsersTab] Failed to fetch users. Status: ${response.status}, Response:`, errorText);
        
        let errorMsg = `HTTP Error ${response.status}`;
        
        if (response.status === 403) {
          errorMsg = 'Access Denied (403): You do not have permission to view users.';
        } else if (response.status === 401) {
          errorMsg = 'Unauthorized (401): Your session has expired. Please log in again.';
        } else if (response.status === 404) {
          errorMsg = 'Endpoint not found (404): Users endpoint is not available.';
        }
        
        throw new Error(errorMsg);
      }

      const data = await response.json();
      console.log('[UsersTab] Users fetched successfully:', data);
      
      if (data.data) {
        setUsers(data.data);
        setTotalPages(data.totalPages || 1);
      } else if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message || "Failed to load users");
      toast.error(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPageNumber(1);
    fetchUsers();
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setPageNumber(1);
  };

  const renderSortIndicator = (column) => {
    if (sortBy !== column) return null;
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Users</h2>
          <p className="mt-1 text-sm text-gray-600">
            View and manage all users in the system
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search by email or name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Search
        </button>
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
          >
            Clear
          </button>
        )}
      </form>

      {/* Page Size Selector */}
      <div className="flex items-center gap-2">
        <label htmlFor="pageSize" className="text-sm font-medium text-gray-700">
          Items per page:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageNumber(1);
          }}
          className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-600">Loading users...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">Error</p>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Table */}
      {!loading && !error && users.length > 0 && (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-900">
                  <button
                    onClick={() => handleSort("email")}
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                  >
                    Email
                    {renderSortIndicator("email")}
                  </button>
                </th>
                <th className="px-6 py-3 font-semibold text-gray-900">
                  <button
                    onClick={() => handleSort("firstName")}
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                  >
                    First Name
                    {renderSortIndicator("firstName")}
                  </button>
                </th>
                <th className="px-6 py-3 font-semibold text-gray-900">
                  <button
                    onClick={() => handleSort("lastName")}
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                  >
                    Last Name
                    {renderSortIndicator("lastName")}
                  </button>
                </th>
                <th className="px-6 py-3 font-semibold text-gray-900">
                  <button
                    onClick={() => handleSort("username")}
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                  >
                    Username
                    {renderSortIndicator("username")}
                  </button>
                </th>
                <th className="px-6 py-3 font-semibold text-gray-900">
                  <button
                    onClick={() => handleSort("createdAt")}
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                  >
                    Created
                    {renderSortIndicator("createdAt")}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr
                  key={user.id || index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 text-gray-700">{user.firstName || "-"}</td>
                  <td className="px-6 py-4 text-gray-700">{user.lastName || "-"}</td>
                  <td className="px-6 py-4 text-gray-700">{user.username || "-"}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-2">No users found</p>
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Clear search filters
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page {pageNumber} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
              disabled={pageNumber === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors font-medium"
            >
              Previous
            </button>
            <button
              onClick={() => setPageNumber(Math.min(totalPages, pageNumber + 1))}
              disabled={pageNumber === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors font-medium"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
