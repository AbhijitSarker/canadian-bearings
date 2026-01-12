'use client';

import { useCart } from '@/contexts/CartContext';
import { X, Trash2, Plus, Minus, Loader2, ShoppingBag, Package } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

function CartItemRow({ item, onUpdate, onRemove }) {
  const [updating, setUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    setUpdating(true);
    await onUpdate(item.cartItemId, newQuantity);
    setUpdating(false);
  };

  const handleRemove = async () => {
    setUpdating(true);
    await onRemove(item.cartItemId);
    setUpdating(false);
  };

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
      {/* Product Image Placeholder */}
      <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center border border-gray-200">
        <Package size={32} className="text-gray-400" />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header with title and remove button */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 text-sm mb-1 leading-tight">
              {item.cbSku || 'Product Item'}
            </h4>
            <p className="text-xs text-gray-500">
              {item.sourceType || item.productSource}
            </p>
          </div>
          <button
            onClick={handleRemove}
            disabled={updating}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Product Info */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3 text-xs text-gray-500">
          <span className="inline-flex items-center">
            ID: <span className="font-medium text-gray-700 ml-1">{item.productId}</span>
          </span>
          {item.sourceReferenceId && (
            <span className="inline-flex items-center">
              Ref: <span className="font-medium text-gray-700 ml-1">{item.sourceReferenceId}</span>
            </span>
          )}
        </div>

        {/* Price and Quantity Controls */}
        <div className="flex items-center justify-between mt-auto">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={updating || item.quantity <= 1}
              className="p-1.5 rounded-md hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <Minus size={14} className="text-gray-600" />
            </button>
            <span className="text-sm font-semibold w-10 text-center text-gray-900">
              {updating ? <Loader2 size={14} className="animate-spin mx-auto text-green-600" /> : item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={updating}
              className="p-1.5 rounded-md hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <Plus size={14} className="text-gray-600" />
            </button>
          </div>

          {/* Price */}
          {item.unitPrice > 0 && (
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                ${(item.unitPrice * item.quantity).toFixed(2)}
              </p>
              {item.quantity > 1 && (
                <p className="text-xs text-gray-500">
                  ${item.unitPrice.toFixed(2)} each
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CartSidebar() {
  const { cart, loading, itemCount, sidebarOpen, closeCart, clearCart, updateItem, removeItem } = useCart();
  const [clearing, setClearing] = useState(false);

  const handleClearCart = async () => {
    if (!confirm('Are you sure you want to clear your cart?')) return;
    setClearing(true);
    await clearCart();
    setClearing(false);
  };

  const subtotal = cart?.items?.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0) || 0;
  const hasPrice = cart?.items?.some(item => item.unitPrice > 0);

  if (!sidebarOpen) return null;

  return (
    <>
      {/* Backdrop with fade animation */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-all duration-300"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Shopping Cart
            </h2>
            <p className="text-sm text-gray-600 mt-0.5">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart
            </p>
          </div>
          <button
            onClick={closeCart}
            className="p-2.5 hover:bg-gray-100 rounded-full transition-colors group"
            aria-label="Close cart"
          >
            <X size={22} className="text-gray-500 group-hover:text-gray-700" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                <ShoppingBag className="absolute inset-0 m-auto w-6 h-6 text-green-600" />
              </div>
              <p className="text-gray-600 mt-4 font-medium">Loading your cart...</p>
            </div>
          ) : !cart || !cart.items || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag size={48} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-sm text-gray-500 mb-6 max-w-xs">
                Start adding products to your cart and they'll appear here
              </p>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {cart.items.map((item) => (
                <CartItemRow
                  key={item.cartItemId}
                  item={item}
                  onUpdate={updateItem}
                  onRemove={removeItem}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart && cart.items && cart.items.length > 0 && (
          <div className="border-t border-gray-200 bg-white p-5 space-y-4">
            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-medium">Items in cart</span>
                <span className="font-semibold text-gray-900">{itemCount}</span>
              </div>
              {hasPrice && (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-green-600">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Taxes calculated at checkout</p>
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm font-semibold text-center shadow-md hover:shadow-lg"
              >
                Proceed to Checkout
              </Link>
              <div className="flex gap-2">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="flex-1 py-2.5 px-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium text-center"
                >
                  View Cart
                </Link>
                <button
                  onClick={handleClearCart}
                  disabled={clearing}
                  className="flex-1 py-2.5 px-4 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {clearing ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      Clearing...
                    </span>
                  ) : (
                    'Clear All'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}