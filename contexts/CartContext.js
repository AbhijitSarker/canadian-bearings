'use client';

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import {
  getCart,
  addCartItem as apiAddCartItem,
  updateCartItem as apiUpdateCartItem,
  removeCartItem as apiRemoveCartItem,
  clearCart as apiClearCart,
} from '@/lib/api/services/cart';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export const CartContext = createContext({});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated, loading: authLoading, selectedCustomer } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch cart data
  const fetchCart = useCallback(async (silent = false) => {
    // Don't fetch if not authenticated or no customer selected
    if (!isAuthenticated || !selectedCustomer) {
      setCart(null);
      setItemCount(0);
      setLoading(false);
      return;
    }

    if (!silent) setLoading(true);
    
    try {
      const result = await getCart();
      
      if (result.success && result.data) {
        setCart(result.data);
        setItemCount(result.data.items?.length || 0);
      } else {
        // If cart doesn't exist or error, set empty cart
        setCart(null);
        setItemCount(0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart(null);
      setItemCount(0);
    } finally {
      if (!silent) setLoading(false);
    }
  }, [isAuthenticated, selectedCustomer]);

  // Initialize cart on mount only when authenticated and customer selected
  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return;
    
    // Only fetch cart if authenticated AND customer selected
    if (isAuthenticated && selectedCustomer) {
      fetchCart();
    } else {
      // Clear cart data if not authenticated or no customer selected
      setCart(null);
      setItemCount(0);
      setLoading(false);
    }
  }, [isAuthenticated, selectedCustomer, authLoading, fetchCart]);

  // Add item to cart
  const addItem = async (productId, sku, quantity, source = 'search', referenceId = null) => {
    try {
      const result = await apiAddCartItem(productId, sku, quantity, source, referenceId);
      
      if (result.success) {
        toast.success('Item added to cart');
        await fetchCart(true); // Refresh cart silently
        return { success: true };
      } else {
        toast.error(result.error || 'Failed to add item to cart');
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart');
      return { success: false, error: error.message };
    }
  };

  // Update cart item quantity
  const updateItem = async (cartItemId, quantity) => {
    try {
      const result = await apiUpdateCartItem(cartItemId, quantity);
      
      if (result.success) {
        await fetchCart(true); // Refresh cart silently
        return { success: true };
      } else {
        toast.error(result.error || 'Failed to update item');
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      toast.error('Failed to update item');
      return { success: false, error: error.message };
    }
  };

  // Remove item from cart
  const removeItem = async (cartItemId) => {
    try {
      const result = await apiRemoveCartItem(cartItemId);
      
      if (result.success) {
        toast.success('Item removed from cart');
        await fetchCart(true); // Refresh cart silently
        return { success: true };
      } else {
        toast.error(result.error || 'Failed to remove item');
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error removing cart item:', error);
      toast.error('Failed to remove item');
      return { success: false, error: error.message };
    }
  };

  // Clear entire cart
  const clearCartItems = async () => {
    try {
      const result = await apiClearCart();
      
      if (result.success) {
        toast.success('Cart cleared');
        setCart(null);
        setItemCount(0);
        return { success: true };
      } else {
        toast.error(result.error || 'Failed to clear cart');
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
      return { success: false, error: error.message };
    }
  };

  // Open cart sidebar
  const openCart = () => {
    setSidebarOpen(true);
  };

  // Close cart sidebar
  const closeCart = () => {
    setSidebarOpen(false);
  };

  const value = {
    cart,
    loading,
    itemCount,
    sidebarOpen,
    addItem,
    updateItem,
    removeItem,
    clearCart: clearCartItems,
    refreshCart: fetchCart,
    openCart,
    closeCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
