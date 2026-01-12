"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Printer, Loader2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CartItem from '@/components/cart/CartItem';
import OrderSummary from '@/components/cart/OrderSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import { Button } from '@/components/ui/button';
import { searchGLCodes } from '@/lib/api/services/glcodes';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const router = useRouter();
  const { cart, loading, updateItem, removeItem } = useCart();
  const [glCodes, setGlCodes] = useState([]);

  useEffect(() => {
    const fetchGLCodes = async () => {
      try {
        const res = await searchGLCodes({ pageSize: 100 });
        if (res.success) {
          setGlCodes(res.data.items || []);
        }
      } catch (error) {
        console.error("Failed to fetch GL codes", error);
      }
    };
    fetchGLCodes();
  }, []);

  const handleUpdateItem = async (cartItemId, data) => {
    await updateItem(cartItemId, data);
  };

  const handleRemove = async (cartItemId) => {
    await removeItem(cartItemId);
  };

  // Calculate totals
  const items = cart?.items || [];
  const subtotal = items.reduce((sum, item) => {
    const price = item.unitPrice || item.price || 0;
    return sum + (price * item.quantity);
  }, 0);
  const savings = 0; // Can be calculated based on discounts if available
  const shipping = 0; // Will be calculated during checkout
  const taxes = 0; // Will be calculated during checkout
  const total = subtotal - savings + shipping + taxes;

  const handleCheckout = () => {
    router.push('/checkout');
  };

  // Transform cart items to match CartItem component props
  const transformedItems = items.map(item => ({
    id: item.cartItemId,
    title: item.cbSku || 'Product',
    brand: item.sourceType || 'Unknown',
    description: `Source: ${item.sourceType || item.productSource}${item.sourceReferenceId ? ` - ${item.sourceReferenceId}` : ''}`,
    price: item.unitPrice || item.price || 0,
    quantity: item.quantity,
    image: "https://placehold.co/400x400/png", // Placeholder image
    cartItemId: item.cartItemId,
    glCode: item.glCode,
    comment: item.comment,
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center justify-center h-96">
            <Loader2 className="w-12 h-12 animate-spin text-green-600 mb-4" />
            <p className="text-gray-600">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg border border-gray-100">
          <h1 className="text-2xl font-semibold text-gray-900">
            Shopping Cart <span className="text-gray-500 font-normal">({items.length} {items.length === 1 ? 'item' : 'items'})</span>
          </h1>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-gray-600 border-gray-200 hover:bg-gray-50"
            onClick={() => window.print()}
          >
            <Printer size={16} />
            Print
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-1 space-y-4">
            {transformedItems.length > 0 ? (
              transformedItems.map(item => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  glCodes={glCodes}
                  onUpdateQuantity={(id, qty) => handleUpdateItem(item.cartItemId, { quantity: qty })}
                  onUpdateItem={handleUpdateItem}
                  onRemove={(id) => handleRemove(item.cartItemId)}
                />
              ))
            ) : (
              <EmptyCart />
            )}
          </div>

          {/* Order Summary Sidebar */}
          {transformedItems.length > 0 && (
            <div className="w-full lg:w-[380px] shrink-0">
              <OrderSummary 
                subtotal={subtotal}
                savings={savings}
                shipping={shipping}
                taxes={taxes}
                total={total}
                itemCount={items.reduce((acc, item) => acc + item.quantity, 0)}
                onCheckout={handleCheckout}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
