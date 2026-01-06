"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Truck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { getProductPrice } from "@/lib/api/services/products";

export default function ProductBuyBox({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [priceData, setPriceData] = useState(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState(true);

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const fetchPrice = async () => {
      setIsLoadingPrice(true);
      
      // Determine which part number to use
      const partNo = product.custSKU || product.cbSku;
      
      if (!partNo) {
        // No part number available, show "On Request"
        setPriceData({ por: true });
        setIsLoadingPrice(false);
        return;
      }

      try {
        const data = await getProductPrice(partNo);
        if (data.success) {
          setPriceData(data.product);
        } else {
          setPriceData({ por: true });
        }
      } catch (error) {
        console.error("Error fetching price:", error);
        // Don't show toast on auto-fetch failure to avoid annoying user immediately on load
        setPriceData({ por: true });
      } finally {
        setIsLoadingPrice(false);
      }
    };

    fetchPrice();
  }, [product.custSKU, product.cbSku]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to cart");
      return;
    }

    setIsAdding(true);
    const sku = product.mfgSku || product.cbSku || product.itemNumber;
    
    try {
      const result = await addItem(product.prodId, sku, quantity);
      if (result.success) {
        openCart();
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-[0px_2px_12px_rgba(0,0,0,0.04)]">
        <div className="mb-6">
          <p className="text-[13px] font-medium text-gray-400">Your Price</p>
          
          {isLoadingPrice ? (
             <div className="mt-1 h-8 w-32 text-black animate-pulse rounded">Getting Price Info..</div>
          ) : (
            <>
              {priceData?.por || !priceData?.price ? (
                <div className="mt-1">
                  <span className="text-2xl font-bold text-slate-900">Price: On Request</span>
                </div>
              ) : (
                <>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-[32px] font-bold text-slate-900">
                      ${priceData.price.toFixed(2)}
                    </span>
                    <span className="text-gray-400 text-sm">/{priceData.uomName || 'each'}</span>
                  </div>
                  {priceData.listPrice > 0 && priceData.listPrice > priceData.price && (
                    <p className="mt-0.5 text-[13px] text-gray-400 line-through">
                      ${priceData.listPrice.toFixed(2)}
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="mb-6 flex items-center gap-4">
          <span className="text-[15px] font-medium text-slate-900">Quantity:</span>
          <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50/50 p-1">
            <button
              onClick={() => handleQuantityChange("decrement")}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-gray-500 shadow-sm transition hover:text-slate-900 disabled:opacity-50"
              disabled={quantity <= 1}
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <div className="w-10 text-center text-[15px] font-bold text-slate-900">
              {quantity}
            </div>
            <button
              onClick={() => handleQuantityChange("increment")}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-gray-500 shadow-sm transition hover:text-slate-900"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Stock Status */}
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 border border-slate-100">
            <Truck className="h-5 w-5 text-slate-700" />
          </div>
          <div className="space-y-1">
            <p className="text-[15px] font-bold text-slate-900 leading-tight">{product.stockStatus}</p>
            <Link href="#" className="block text-[13px] text-[#4a8b3c] font-medium underline-offset-4 hover:underline">
              {product.estimatedArrival}
            </Link>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#4a8b3c] py-4 text-sm font-bold text-white transition-all hover:bg-[#3a6f2f] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="h-5 w-5" />
          {isAdding ? 'Adding...' : 'Add Cart'}
        </button>
      </div>
    </>
  );
}