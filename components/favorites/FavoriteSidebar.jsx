'use client';

import { useFavorite } from '@/contexts/FavoriteContext';
import { X, Heart, Loader2, ChevronRight, ChevronDown, Plus, List, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

function FavoriteListRow({ list, onClose }) {
  return (
    <Link
      href={`/favorites/${list.id}`}
      onClick={onClose}
      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50/50 transition-all group"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Heart size={20} className="text-red-500" fill="currentColor" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 text-sm mb-0.5 truncate">
          {list.name}
        </h4>
        <p className="text-xs text-gray-500 truncate mb-1">
          {list.description || 'No description'}
        </p>
        <p className="text-xs text-gray-400">
          {list.favoritesCount || 0} {list.favoritesCount === 1 ? 'item' : 'items'}
        </p>
      </div>
      <ChevronRight size={18} className="text-gray-400 group-hover:text-green-600 transition-colors" />
    </Link>
  );
}

export default function FavoriteSidebar() {
  const { favoriteLists, loading, sidebarOpen, closeSidebar, productToAdd, createList, addToFavorite } = useFavorite();
  const [mode, setMode] = useState('select'); // 'select' or 'create'
  const [selectedListId, setSelectedListId] = useState('');
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Reset state when sidebar opens/closes or product changes
  useEffect(() => {
    if (sidebarOpen) {
      setMode('select');
      setNewListName('');
      setNewListDescription('');
      setIsSubmitting(false);
      setError('');
      if (favoriteLists.length > 0) {
        setSelectedListId(favoriteLists[0].id);
      }
    }
  }, [sidebarOpen, favoriteLists, productToAdd]);

  const handleSave = async () => {
    if (!productToAdd) return;
    setError('');
    setIsSubmitting(true);

    try {
      let targetListId = selectedListId;

      if (mode === 'create') {
        if (!newListName.trim()) {
          setError('Please enter a list name');
          setIsSubmitting(false);
          return;
        }
        const listResult = await createList({
          name: newListName,
          description: newListDescription,
          isShared: false,
          isEditable: true
        });

        if (listResult.success) {
          targetListId = listResult.data.id;
        } else {
          setError('Failed to create list');
          setIsSubmitting(false);
          return;
        }
      }

      if (targetListId) {
        await addToFavorite(productToAdd.id, productToAdd.itemNumber || productToAdd.sku, targetListId);
        closeSidebar();
      }
    } catch (error) {
      console.error('Error saving favorite:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!sidebarOpen) return null;

  return (
    <>
      {/* Backdrop with fade animation */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-all duration-300"
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gradient-to-r from-red-50 to-pink-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Heart size={22} className="text-red-500" fill="currentColor" />
              {productToAdd ? 'Add to Favorites' : 'My Favorites'}
            </h2>
            <p className="text-sm text-gray-600 mt-0.5">
              {productToAdd ? 'Save to your list' : `${favoriteLists.length} ${favoriteLists.length === 1 ? 'list' : 'lists'}`}
            </p>
          </div>
          <button
            onClick={closeSidebar}
            className="p-2.5 hover:bg-white/80 rounded-full transition-colors group"
            aria-label="Close sidebar"
          >
            <X size={22} className="text-gray-500 group-hover:text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {productToAdd ? (
            <div className="p-5 space-y-6">
              {/* Product Details Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Product Details</p>
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200">
                    {productToAdd.image ? (
                      <Image src={productToAdd.image} alt={productToAdd.name} width={96} height={96} className="object-contain w-full h-full p-2" />
                    ) : (
                      <div className="text-xs text-gray-400 text-center px-2">No Image</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-1">{productToAdd.brand || 'Brand'}</p>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm leading-tight">{productToAdd.name}</h3>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">{productToAdd.description}</p>
                    <div className="flex items-baseline gap-2 mt-auto">
                      <p className="text-lg font-bold text-gray-900">${productToAdd.price}</p>
                      <span className="text-xs text-gray-500">/each</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">Item #{productToAdd.itemNumber || productToAdd.sku}</p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Form Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                {mode === 'select' ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <List size={18} className="text-gray-600" />
                        Select a List
                      </h3>
                      <span className="text-xs text-gray-500">{favoriteLists.length} available</span>
                    </div>

                    <div className="relative">
                      <select
                        value={selectedListId}
                        onChange={(e) => setSelectedListId(e.target.value)}
                        className="w-full p-3 pr-10 bg-gray-50 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm font-medium"
                      >
                        {favoriteLists.map(list => (
                          <option key={list.id} value={list.id}>
                            {list.name} ({list.favoritesCount || 0} items)
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </div>

                    <button
                      onClick={() => setMode('create')}
                      className="w-full py-2.5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-dashed border-green-300 text-green-700 rounded-lg hover:border-green-400 hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100 transition-all font-medium flex items-center justify-center gap-2"
                    >
                      <Plus size={18} />
                      Create New List
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Sparkles size={18} className="text-green-600" />
                        Create New List
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          List Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={newListName}
                          onChange={(e) => setNewListName(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="e.g., Workshop Tools, Office Supplies"
                          maxLength={50}
                        />
                        <p className="text-xs text-gray-500 mt-1">{newListName.length}/50 characters</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Description <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <textarea
                          value={newListDescription}
                          onChange={(e) => setNewListDescription(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                          placeholder="Add a brief description for this list..."
                          rows={3}
                          maxLength={200}
                        />
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-gray-500">Help you remember what this list is for</p>
                          <p className="text-xs text-gray-400">{newListDescription.length}/200</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setMode('select')}
                      className="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium flex items-center justify-center gap-2"
                    >
                      <List size={18} />
                      Back to Existing Lists
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Default List View (When opened from Navbar)
            <div>
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full py-20">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                    <Heart className="absolute inset-0 m-auto w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-gray-600 mt-4 font-medium">Loading your favorites...</p>
                </div>
              ) : !favoriteLists || favoriteLists.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 py-20">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
                    <Heart size={48} className="text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorite lists yet</h3>
                  <p className="text-sm text-gray-500 mb-6 max-w-xs">
                    Start organizing your favorite products by creating your first list
                  </p>
                  <Link
                    href="/favorites"
                    onClick={closeSidebar}
                    className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md hover:shadow-lg"
                  >
                    Create Your First List
                  </Link>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {favoriteLists.map((list) => (
                    <FavoriteListRow
                      key={list.id}
                      list={list}
                      onClose={closeSidebar}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {productToAdd ? (
          <div className="border-t border-gray-200 bg-white p-5 space-y-3">
            <button
              onClick={handleSave}
              disabled={isSubmitting || (mode === 'create' && !newListName.trim())}
              className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Heart size={18} />
                  {mode === 'create' ? 'Create & Add to List' : 'Add to List'}
                </>
              )}
            </button>
            <button
              onClick={closeSidebar}
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="border-t border-gray-200 bg-white p-5">
            <Link
              href="/favorites"
              onClick={closeSidebar}
              className="block w-full py-3 px-4 bg-gradient-to-r from-red-600 to-pink-600 text-white text-center rounded-lg hover:from-red-700 hover:to-pink-700 transition-all font-semibold shadow-md hover:shadow-lg"
            >
              Manage All Lists
            </Link>
          </div>
        )}
      </div>
    </>
  );
}