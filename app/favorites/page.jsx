'use client';

import { useState, useEffect } from 'react';
import { useFavorite } from '@/contexts/FavoriteContext';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Trash2, Search, ChevronDown, Command } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FavoriteListsPage() {
  const { favoriteLists, loading, fetchFavoriteLists, createList, deleteList } = useFavorite();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [authLoading, isAuthenticated, router]);

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

  const handleDeleteList = async (id) => {
    if (confirm('Are you sure you want to delete this list?')) {
      await deleteList(id);
    }
  };

  // Filter lists based on search
  const filteredLists = favoriteLists.filter(list => 
    list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (list.description && list.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {/* Sort By */}
        <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
            <span className="text-gray-500">Sort by</span>
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs text-gray-500 font-medium">
              ⌘1
            </div>
          </div>

          {/* Create Button */}
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium whitespace-nowrap"
          >
            <Plus size={18} />
            Create New List
          </button>
        </div>
      </div>

      {/* Create List Modal/Form (Inline for now) */}
      {isCreating && (
        <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200 animate-in fade-in slide-in-from-top-4">
          <h3 className="text-lg font-semibold mb-4">Create New List</h3>
          <form onSubmit={handleCreateList} className="flex gap-4">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Enter list name..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-6 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition font-medium"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 w-1/5">List Name</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 w-2/5">Descriptions</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 w-1/6">Created By</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 w-1/6">Last Modified</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-gray-500 w-1/12">Item Number</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLists.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-500">
                    No lists found.
                  </td>
                </tr>
              ) : (
                filteredLists.map((list) => (
                  <tr key={list.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="py-4 px-6">
                      <Link href={`/favorites/${list.id}`} className="font-semibold text-gray-900 hover:text-green-600">
                        {list.name}
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {list.description || 'No description provided.'}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900 font-medium">
                        {user?.firstName} {user?.lastName}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-500">
                        {/* Mocking "Today, 3:52 PM" format for now, using actual date */}
                        {new Date(list.dateUpdated || list.dateCreated).toLocaleDateString(undefined, { 
                          month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' 
                        })}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-4">
                        <Link 
                          href={`/favorites/${list.id}`}
                          className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded hover:bg-gray-200 transition"
                        >
                          View Item
                        </Link>
                        <button 
                          onClick={() => handleDeleteList(list.id)}
                          className="text-gray-400 hover:text-red-500 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
