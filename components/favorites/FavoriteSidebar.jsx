'use client';

import { useFavorite } from '@/contexts/FavoriteContext';
import { X, Heart, Loader2, ChevronRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

function FavoriteListRow({ list, onClose }) {
  return (
    <Link 
      href={`/favorites/${list.id}`}
      onClick={onClose}
      className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
    >
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">
          {list.name}
        </h4>
        <p className="text-xs text-gray-500 truncate">
          {list.description || 'No description'}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {list.favoritesCount || 0} items
        </p>
      </div>
      <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
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

  // Reset state when sidebar opens/closes or product changes
  useEffect(() => {
    if (sidebarOpen) {
      setMode('select');
      setNewListName('');
      setNewListDescription('');
      setIsSubmitting(false);
      if (favoriteLists.length > 0) {
        setSelectedListId(favoriteLists[0].id);
      }
    }
  }, [sidebarOpen, favoriteLists, productToAdd]);

  const handleSave = async () => {
    if (!productToAdd) return;
    setIsSubmitting(true);

    try {
      let targetListId = selectedListId;

      if (mode === 'create') {
        if (!newListName.trim()) {
            // Should show error
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
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!sidebarOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            {productToAdd ? 'Add Your Favorite List' : 'My Favorites'}
          </h2>
          <button
            onClick={closeSidebar}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {productToAdd ? (
            <div className="p-4 space-y-6">
              {/* Product Details */}
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200">
                  {productToAdd.image ? (
                     <Image src={productToAdd.image} alt={productToAdd.name} width={96} height={96} className="object-contain w-full h-full" />
                  ) : (
                    <div className="text-xs text-gray-400">No Image</div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">{productToAdd.brand || 'Brand'}</p>
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{productToAdd.name}</h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{productToAdd.description}</p>
                  <p className="text-xs text-gray-400 mb-2">Item #{productToAdd.itemNumber || productToAdd.sku}</p>
                  <p className="text-lg font-bold text-gray-900">${productToAdd.price}<span className="text-sm font-normal text-gray-500">/each</span></p>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Form Section */}
              <div className="space-y-4">
                {mode === 'select' ? (
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Add to Existing List</h3>
                    <div className="relative">
                      <select
                        value={selectedListId}
                        onChange={(e) => setSelectedListId(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        {favoriteLists.map(list => (
                          <option key={list.id} value={list.id}>{list.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                    
                    <button
                      onClick={() => setMode('create')}
                      className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center gap-2"
                    >
                      + Create New List
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Create New List</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">New List Name</label>
                        <input
                          type="text"
                          value={newListName}
                          onChange={(e) => setNewListName(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Enter list name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Description <span className="text-gray-400">(Optional)</span></label>
                        <textarea
                          value={newListDescription}
                          onChange={(e) => setNewListDescription(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-24 resize-none"
                          placeholder="Placeholder text..."
                          maxLength={200}
                        />
                        <div className="text-right text-xs text-gray-400 mt-1">{newListDescription.length}/200</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setMode('select')}
                      className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                    >
                      Add to Existing List
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Default List View (When opened from Navbar)
            <div>
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-red-500 mb-2" />
                  <p className="text-gray-500">Loading favorites...</p>
                </div>
              ) : !favoriteLists || favoriteLists.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                  <Heart size={64} className="text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No favorite lists yet</h3>
                  <p className="text-sm text-gray-500 mb-4">Create a list to start saving items.</p>
                  <Link
                    href="/favorites"
                    onClick={closeSidebar}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                  >
                    Manage Favorites
                  </Link>
                </div>
              ) : (
                <div>
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
          <div className="border-t border-gray-200 p-4 flex gap-3">
            <button
              onClick={closeSidebar}
              className="flex-1 py-2 px-4 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50 flex items-center justify-center"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Save'}
            </button>
          </div>
        ) : (
          <div className="border-t border-gray-200 p-4">
            <Link
              href="/favorites"
              onClick={closeSidebar}
              className="block w-full py-2 px-4 bg-gray-900 text-white text-center rounded-lg hover:bg-gray-800 transition text-sm font-medium"
            >
              View All Lists
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
