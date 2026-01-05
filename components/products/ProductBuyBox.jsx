"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Truck, Eye } from "lucide-react";
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
  const [isPriceRevealed, setIsPriceRevealed] = useState(false);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleRevealPrice = async () => {
    setIsLoadingPrice(true);
    
    // Determine which part number to use
    const partNo = product.custSKU || product.cbSku;
    
    if (!partNo) {
      // No part number available, show "On Request"
      setPriceData({ por: true });
      setIsPriceRevealed(true);
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
      setIsPriceRevealed(true);
    } catch (error) {
      console.error("Error fetching price:", error);
      toast.error("Failed to load price");
      setPriceData({ por: true });
      setIsPriceRevealed(true);
    } finally {
      setIsLoadingPrice(false);
    }
  };

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
      {/* The Buy Box Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500">Your Price</p>
          
          {!isPriceRevealed ? (
            <button
              onClick={handleRevealPrice}
              disabled={isLoadingPrice}
              className="mt-2 flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 transition-all hover:bg-slate-200 disabled:opacity-50"
            >
              <Eye className="h-4 w-4" />
              {isLoadingPrice ? "Loading..." : "Reveal Price"}
            </button>
          ) : (
            <>
              {priceData?.por || !priceData?.price ? (
                <div className="mt-1">
                  <span className="text-2xl font-bold text-slate-900">Price: On Request</span>
                </div>
              ) : (
                <>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-900">
                      ${priceData.price.toFixed(2)}
                    </span>
                    <span className="text-gray-500">/{priceData.uomName || 'each'}</span>
                  </div>
                  {priceData.listPrice > 0 && priceData.listPrice > priceData.price && (
                    <p className="mt-1 text-sm text-gray-400 line-through">
                      ${priceData.listPrice.toFixed(2)}
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="mb-6 flex items-center justify-between">
          <span className="font-medium">Quantity:</span>
          <div className="flex items-center rounded-md border border-gray-300">
            <button
              onClick={() => handleQuantityChange("decrement")}
              className="flex h-10 w-10 items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-slate-900 disabled:opacity-50"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="flex h-10 w-14 items-center justify-center border-x border-gray-300 bg-white text-center font-medium">
              {quantity}
            </div>
            <button
              onClick={() => handleQuantityChange("increment")}
              className="flex h-10 w-10 items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-slate-900"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Stock Status */}
        <div className="mb-6 flex gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <Truck className="h-5 w-5 text-slate-700" />
          </div>
          <div>
            <p className="font-bold text-green-700">{product.stockStatus}</p>
            <Link href="#" className="text-sm text-gray-500 underline hover:text-slate-900">
              {product.estimatedArrival}
            </Link>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-[#4a8b3c] py-4 text-base font-bold text-white transition-colors hover:bg-[#3a6f2f] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="h-5 w-5" />
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </>
  );
}