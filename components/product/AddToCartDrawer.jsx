"use client";
import React, { useEffect, useState } from "react";
import { X, Minus, Plus } from "lucide-react";

export default function AddToCartDrawer({ isOpen, onClose, product, initialQuantity }) {
  const [quantity, setQuantity] = useState(initialQuantity || 1);

  // Sync internal quantity if prop changes
  useEffect(() => {
    setQuantity(initialQuantity || 1);
  }, [initialQuantity]);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="relative z-50">
      {/* Overlay (Dimmed Background) */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="fixed inset-y-0 right-0 flex w-full max-w-[500px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out">
        
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-slate-900">Add To Cart</h2>
          <button 
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-800 hover:bg-green-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* --- BODY --- */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex gap-6">
            {/* Product Image */}
            <div className="h-32 w-32 flex-shrink-0 rounded-lg border border-gray-200 bg-white p-2">
              <img 
                src={product.images ? product.images[0] : "https://placehold.co/150x150"} 
                alt={product.title} 
                className="h-full w-full object-contain mix-blend-multiply"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-orange-500">{product.brand}</span>
              <h3 className="text-xl font-bold text-slate-900 leading-tight">{product.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                {product.subtitle || product.description}
              </p>
              <span className="mt-1 text-xs font-medium text-gray-400">
                Item #{product.itemNumber}
              </span>
            </div>
          </div>

          {/* Quantity & Price Section */}
          <div className="mt-8 flex flex-col gap-6">
            
            {/* Quantity Selector */}
            <div className="flex items-center justify-between">
                <span className="text-base font-bold text-slate-900">Quantity:</span>
                <div className="flex items-center rounded-full border border-gray-200 shadow-sm">
                    <button 
                        onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-l-full hover:bg-gray-50 text-slate-600"
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <div className="flex h-10 w-12 items-center justify-center font-bold text-slate-900">
                        {quantity}
                    </div>
                    <button 
                        onClick={() => setQuantity(q => q + 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-r-full hover:bg-gray-50 text-slate-600"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-1 border-t border-gray-100 pt-6">
                <span className="text-3xl font-bold text-slate-900">
                    {product.currency}{product.price}
                </span>
                <span className="text-sm text-gray-500">/each</span>
            </div>

          </div>
        </div>

        {/* --- FOOTER --- */}
        <div className="border-t border-gray-100 p-6 bg-white">
          <div className="flex gap-4">
            <button 
                onClick={onClose}
                className="flex-1 rounded-md border border-gray-300 bg-white py-4 text-sm font-bold text-slate-700 hover:bg-gray-50 transition-colors"
            >
                Continue To Shopping
            </button>
            <button className="flex-1 rounded-md bg-[#4a8b3c] py-4 text-sm font-bold text-white hover:bg-[#3a6f2f] transition-colors shadow-lg shadow-green-900/10">
                View Cart and Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}