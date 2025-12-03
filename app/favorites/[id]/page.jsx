'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFavorite } from '@/contexts/FavoriteContext';
import { getFavoriteList, getFavoritesByList } from '@/lib/api/services/favorites';
import { Loader2, ArrowLeft, Trash2, ShoppingCart, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function FavoriteListDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { removeFromFavorite } = useFavorite();
  const [list, setList] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

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

  const handleRemoveItem = async (itemId) => {
    if (!confirm('Remove this item from favorites?')) return;
    
    setRemovingId(itemId);
    const result = await removeFromFavorite(itemId);
    
    if (result.success) {
      setItems(prev => prev.filter(item => item.id !== itemId));
    }
    setRemovingId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  if (!list) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        href="/favorites"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Lists
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{list.name}</h1>
        {list.description && (
          <p className="text-gray-600 mb-4">{list.description}</p>
        )}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            Created: {new Date(list.dateCreated).toLocaleDateString()}
          </span>
          <span>•</span>
          <span>{items.length} items</span>
        </div>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">No items in this list yet.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-24 h-24 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center">
                {/* Placeholder for product image since API response structure for item details isn't fully clear on image path */}
                <div className="text-gray-400 text-xs text-center p-2">No Image</div>
              </div>
              
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <h3 className="font-medium text-gray-900 text-lg mb-1">
                  {item.cbSku || item.sku || 'Product Item'}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  Product ID: {item.productId}
                </p>
                <div className="text-xs text-gray-400">
                  Added: {new Date(item.dateCreated).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={removingId === item.id}
                  className="flex-1 sm:flex-none py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-red-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {removingId === item.id ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Trash2 size={18} />
                      <span className="sm:hidden">Remove</span>
                    </>
                  )}
                </button>
                <button className="flex-1 sm:flex-none py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
