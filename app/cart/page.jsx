"use client";

import React, { useState } from 'react';
import { Printer } from 'lucide-react';
import CartItem from '@/components/cart/CartItem';
import OrderSummary from '@/components/cart/OrderSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import { Button } from '@/components/ui/button';

const INITIAL_ITEMS = [
  {
    id: 1,
    title: "SKF 6203 2ZJEM",
    brand: "SKF",
    description: "6203 2ZJEM | Single Row Cylindrical Bore Deep Groove Ball Bearing...",
    price: 95.67,
    quantity: 3,
    image: "/images/product-placeholder.png" // Placeholder, will need a real image or use a placeholder service if local not available
  },
  {
    id: 2,
    title: "SKF 6203 2ZJEM",
    brand: "SKF",
    description: "6203 2ZJEM | Single Row Cylindrical Bore Deep Groove Ball Bearing...",
    price: 95.67,
    quantity: 3,
    image: "/images/product-placeholder.png"
  },
  {
    id: 3,
    title: "SKF 6203 2ZJEM",
    brand: "SKF",
    description: "6203 2ZJEM | Single Row Cylindrical Bore Deep Groove Ball Bearing...",
    price: 95.67,
    quantity: 3,
    image: "/images/product-placeholder.png"
  }
];

// Using a placeholder image that likely exists or a generic one
const PLACEHOLDER_IMAGE = "https://placehold.co/400x400/png"; 

export default function CartPage() {
  const [items, setItems] = useState(INITIAL_ITEMS.map(item => ({ ...item, image: PLACEHOLDER_IMAGE })));

  const handleUpdateQuantity = (id, newQuantity) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = 49.20; // Hardcoded for demo as per screenshot
  const shipping = 0;
  const taxes = 0;
  const total = subtotal - savings + shipping + taxes;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg border border-gray-100">
          <h1 className="text-2xl font-semibold text-gray-900">
            Shopping Cart <span className="text-gray-500 font-normal">({items.length} item)</span>
          </h1>
          <Button variant="outline" size="sm" className="text-gray-600 border-gray-200 hover:bg-gray-50">
            <Printer size={16} />
            Print
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-1 space-y-4">
            {items.length > 0 ? (
              items.map(item => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemove}
                />
              ))
            ) : (
              <EmptyCart />
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-[380px] shrink-0">
            <OrderSummary 
              subtotal={subtotal}
              savings={savings}
              shipping={shipping}
              taxes={taxes}
              total={total}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
