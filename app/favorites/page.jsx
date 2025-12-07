'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useFavorite } from '@/contexts/FavoriteContext';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Search, ChevronDown, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FavoriteListTable from '@/components/favorites/FavoriteListTable';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function FavoriteListsPage() {
  const { favoriteLists, loading, createList, deleteList } = useFavorite();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  
  // UI State
  const [isCreating, setIsCreating] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const filterMenuRef = useRef(null);
  
  // Delete Modal State
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Table State
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ by: 'dateCreated', direction: 'desc' });
  const [filters, setFilters] = useState({
    dateRange: "all",
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [authLoading, isAuthenticated, router]);

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

  const handleCreateList = async (e) => {
    e.preventDefault();
    if (!newListName.trim()) return;

    const result = await createList({
      name: newListName,
      description: '',
      isShared: false,
      isEditable: true
    });

    if (result.success) {
      setNewListName('');
      setIsCreating(false);
    }
  };

  const confirmDeleteList = (id) => {
    setDeleteId(id);
  };

  const handleDeleteList = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    await deleteList(deleteId);
    setIsDeleting(false);
    setDeleteId(null);
  };

  const handleSort = (column) => {
    setSort(prev => ({
      by: column,
      direction: prev.by === column && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    setPage(1);
  };

  // Filter and Sort Logic
  const processedLists = useMemo(() => {
    let result = [...favoriteLists];

    // 1. Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(list => 
        list.name.toLowerCase().includes(lowerQuery) ||
        (list.description && list.description.toLowerCase().includes(lowerQuery))
      );
    }

    // 2. Date Filters
    if (filters.dateRange !== 'all') {
      const now = new Date();
      let start = null;
      let end = new Date(); // End is now by default

      if (filters.dateRange === 'custom') {
        if (filters.startDate) start = new Date(filters.startDate);
        if (filters.endDate) end = new Date(filters.endDate);
      } else {
        start = new Date();
        if (filters.dateRange === 'last-week') start.setDate(now.getDate() - 7);
        if (filters.dateRange === 'last-month') start.setMonth(now.getMonth() - 1);
        if (filters.dateRange === 'last-year') start.setFullYear(now.getFullYear() - 1);
      }

      if (start) {
        // Reset hours to compare dates properly
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);

        result = result.filter(list => {
          const date = new Date(list.dateCreated);
          return date >= start && date <= end;
        });
      }
    }

    // 3. Sorting
    result.sort((a, b) => {
      let valA = a[sort.by];
      let valB = b[sort.by];

      // Handle dates
      if (sort.by === 'dateCreated') {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      } else if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sort.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [favoriteLists, searchQuery, filters, sort]);

  // Pagination Logic
  const totalRecords = processedLists.length;
  const totalPages = Math.ceil(totalRecords / perPage) || 1;
  const paginatedLists = processedLists.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Controls */}
      <div className="space-y-4 sm:space-y-4 border p-4 sm:p-6 rounded-lg shadow-sm bg-white mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Favorite Lists</h2>
          <button 
            onClick={() => setIsCreating(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-700 transition"
          >
            <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span>Create New List</span>
          </button>
        </div>

        {/* Create List Form */}
        {isCreating && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 animate-in fade-in slide-in-from-top-2">
            <h3 className="text-sm font-semibold mb-3">Create New List</h3>
            <form onSubmit={handleCreateList} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Enter list name..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="flex-1 sm:flex-none px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="flex flex-col gap-2 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search lists..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
            </div>
            
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

                        <div className="flex gap-2 pt-4 border-t mt-4">
                          <button
                            onClick={() => {
                              setFilters({ 
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mb-6">
          <FavoriteListTable 
            lists={paginatedLists} 
            sort={sort} 
            onSort={handleSort} 
            loading={loading} 
            onDelete={confirmDeleteList}
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

                    {page > 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {page > 2 && page < totalPages - 1 && (
                      <PaginationItem>
                        <PaginationLink 
                          onClick={() => setPage(page)} 
                          isActive={true}
                          className="cursor-pointer text-xs sm:text-sm"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {page < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

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
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the favorite list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteList} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
