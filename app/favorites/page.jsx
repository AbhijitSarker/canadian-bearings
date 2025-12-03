'use client';

import { useState, useEffect } from 'react';
import { useFavorite } from '@/contexts/FavoriteContext';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Trash2, Heart, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FavoriteListsPage() {
  const { favoriteLists, loading, fetchFavoriteLists, createList, deleteList } = useFavorite();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [newListName, setNewListName] = useState('');

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

  if (authLoading || (loading && favoriteLists.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500 fill-current" />
          My Favorite Lists
        </h1>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <Plus size={20} />
          Create New List
        </button>
      </div>

      {isCreating && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <form onSubmit={handleCreateList} className="flex gap-4">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Enter list name..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {favoriteLists.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <Heart size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No favorite lists yet</h3>
          <p className="text-gray-500 mb-6">Create your first list to start saving items.</p>
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Create List
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteLists.map((list) => (
            <div key={list.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-6">
              <div className="flex justify-between items-start mb-4">
                <Link href={`/favorites/${list.id}`} className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-red-600 transition mb-1">
                    {list.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {list.description || 'No description'}
                  </p>
                </Link>
                <button
                  onClick={() => handleDeleteList(list.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                  title="Delete list"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                <span>{list.favoritesCount || 0} items</span>
                <span>{new Date(list.dateCreated).toLocaleDateString()}</span>
              </div>
              <Link
                href={`/favorites/${list.id}`}
                className="block mt-4 text-center py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
