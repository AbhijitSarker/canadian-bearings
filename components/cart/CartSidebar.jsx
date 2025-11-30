'use client';

import { useCart } from '@/contexts/CartContext';
import { X, Trash2, Plus, Minus, Loader2, ShoppingBag } from 'lucide-react';
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
    <div className="flex gap-4 py-4 border-b border-gray-100">
      {/* Product Image Placeholder */}
      <div className="w-20 h-20 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center">
        <ShoppingBag size={32} className="text-gray-400" />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">
          {item.cbSku || 'Product'}
        </h4>
        <p className="text-xs text-gray-500 mb-2">
          Source: {item.sourceType || item.productSource}
          {item.sourceReferenceId && ` - ${item.sourceReferenceId}`}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={updating || item.quantity <= 1}
            className="p-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus size={14} />
          </button>
          <span className="text-sm font-medium w-12 text-center">
            {updating ? <Loader2 size={14} className="animate-spin mx-auto" /> : item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={updating}
            className="p-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={14} />
          </button>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            disabled={updating}
            className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Price */}
        {item.unitPrice > 0 && (
          <p className="text-sm font-semibold text-gray-900 mt-2">
            ${(item.unitPrice * item.quantity).toFixed(2)}
          </p>
        )}
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

  if (!sidebarOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Shopping Cart ({itemCount})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-green-600 mb-2" />
              <p className="text-gray-500">Loading cart...</p>
            </div>
          ) : !cart || !cart.items || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingBag size={64} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-sm text-gray-500">Add items to get started</p>
            </div>
          ) : (
            <div>
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
          <div className="border-t border-gray-200 p-4 space-y-3">
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Items</span>
                <span className="font-medium">{itemCount}</span>
              </div>
              {/* Add subtotal if prices are available */}
              {cart.items.some(item => item.unitPrice > 0) && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    ${cart.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={handleClearCart}
                disabled={clearing}
                className="w-full py-2 px-4 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition text-sm font-medium disabled:opacity-50"
              >
                {clearing ? 'Clearing...' : 'Clear Cart'}
              </button>
              <button
                className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
