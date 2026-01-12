'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFavorite } from '@/contexts/FavoriteContext';
import { getFavoriteList, getFavoritesByList } from '@/lib/api/services/favorites';
import { Loader2, Trash2, ShoppingCart, Search, ChevronDown, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
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
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function FavoriteListDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { removeFromFavorite } = useFavorite();
  const [list, setList] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchDetails = useCallback(async () => {
    try {
      const [listRes, itemsRes] = await Promise.all([
        getFavoriteList(params.id),
        getFavoritesByList(params.id, {
          pageNumber: 1,
          pageSize: 100,
          sortBy: 'DateCreated',
          sortDirection: 'desc'
        })
      ]);

      if (listRes.success) {
        setList(listRes.data);
      } else {
        toast.error('Failed to load list details');
        router.push('/favorites');
        return;
      }

      if (itemsRes.success) {
        setItems(itemsRes.data.items || []);
      }
    } catch (error) {
      console.error('Error fetching details:', error);
      toast.error('Error loading page');
    } finally {
      setLoading(false);
    }
  }, [params.id, router]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const confirmRemoveItem = (itemId) => {
    setItemToDelete(itemId);
  };

  const handleRemoveItem = async () => {
    if (!itemToDelete) return;

    setIsDeleting(true);
    const result = await removeFromFavorite(itemToDelete);

    if (result.success) {
      setItems(prev => prev.filter(item => item.id !== itemToDelete));
      toast.success('Item removed from favorites');
    } else {
      toast.error('Failed to remove item');
    }
    setIsDeleting(false);
    setItemToDelete(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (!list) return null;

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          {/* Search */}
          <div className="relative w-full md:w-96">
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

          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            {/* Select All */}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
              <div className="w-4 h-4 border border-gray-300 rounded"></div>
              <span className="text-sm font-medium">Select All</span>
            </button>

            {/* Sort By */}
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                <span className="text-sm font-medium">Sort by</span>
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Add Item */}
            <button className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
              <Plus size={18} />
              Add Item
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500">No items in this list yet.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row gap-6 items-start">
                {/* Checkbox */}
                <div className="pt-2">
                  <div className="w-5 h-5 border border-gray-300 rounded cursor-pointer hover:border-green-500"></div>
                </div>

                {/* Image */}
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100">
                  {/* Placeholder or actual image if available in item data */}
                  <div className="text-gray-400 text-xs text-center p-2">No Image</div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 mb-1">SKF</p>
                  <h3 className="font-semibold text-gray-900 text-xl mb-2">
                    {item.cbSku || item.sku || 'SKF 6203 2ZJEM'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    6203 2ZJEM | Single Row Cylindrical Bore Deep Groove Ball Bearing
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Item #{item.productId}
                  </p>

                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• SNW-11 Series Adapter Sleeve</li>
                    <li>• 1 15/16" Shaft Size</li>
                    <li>• Use w/1200K & 1300K Series Ball Bearings, 22200K Series Roller Bearings</li>
                  </ul>
                </div>

                {/* Price & Actions */}
                <div className="flex flex-col items-end gap-6 min-w-[200px]">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">$31.89<span className="text-sm font-normal text-gray-500">/each</span></div>

                    {/* Quantity */}
                    <div className="flex items-center justify-end gap-3 mt-2">
                      <span className="text-sm text-gray-500">Quantity:</span>
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button className="p-1 hover:bg-gray-50 text-gray-500"><Minus size={14} /></button>
                        <span className="w-8 text-center text-sm font-medium">3</span>
                        <button className="p-1 hover:bg-gray-50 text-gray-500"><Plus size={14} /></button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 w-full">
                    <button className="w-full py-2.5 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 font-medium">
                      <ShoppingCart size={18} />
                      Add Cart
                    </button>
                    <button
                      onClick={() => confirmRemoveItem(item.id)}
                      className="w-full py-2.5 px-4 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition flex items-center justify-center gap-2 font-medium"
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <AlertDialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Item?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove this item from the list?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setItemToDelete(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleRemoveItem} disabled={isDeleting}>
                {isDeleting ? 'Removing...' : 'Remove'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ProtectedRoute>
  );
}
