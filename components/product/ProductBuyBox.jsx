"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Truck } from "lucide-react";

export default function ProductBuyBox({ product }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-500">Your Price</p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-slate-900">
            {product.currency}{product.price}
          </span>
          <span className="text-gray-500">/each</span>
        </div>
        <p className="mt-1 text-sm text-gray-400 line-through">
          {product.currency}{product.msrp}
        </p>
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
      <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#4a8b3c] py-4 text-base font-bold text-white transition-colors hover:bg-[#3a6f2f]">
        <ShoppingCart className="h-5 w-5" /> Add Cart
      </button>
    </div>
  );
}