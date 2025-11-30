import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { formatAPIError } from '@/lib/utils/api-error';

/**
 * Get current cart
 */
export const getCart = async () => {
  try {
    const res = await apiClient.get(endpoints.cart.get);
    
    if (res.success) {
      return { 
        success: true, 
        data: res.data,
      };
    }
    return { success: false, error: res.error || 'Failed to fetch cart' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

/**
 * Add item to cart
 * @param {number} productId - Product ID
 * @param {string} sku - Product SKU
 * @param {number} quantity - Quantity to add
 * @param {string} source - Source type: 'search', 'quote', or 'order'
 * @param {string} referenceId - Reference ID for the source
 */
export const addCartItem = async (productId, sku, quantity, source = 'search', referenceId = null) => {
  try {
    const payload = {
      productId,
      sku,
      quantity,
      source,
      referenceId,
    };

    const res = await apiClient.post(endpoints.cart.addItem, payload);

    if (res.success) {
      return { success: true, data: res.data };
    }
    return { success: false, error: res.error || 'Failed to add item to cart' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

/**
 * Update cart item quantity
 * @param {number} cartItemId - Cart item ID
 * @param {number} quantity - New quantity
 */
export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const url = endpoints.cart.updateItem.replace(':cartItemId', cartItemId);
    const payload = { quantity };

    const res = await apiClient.put(url, payload);

    if (res.success) {
      return { success: true, data: res.data };
    }
    return { success: false, error: res.error || 'Failed to update cart item' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

/**
 * Remove item from cart
 * @param {number} cartItemId - Cart item ID
 */
export const removeCartItem = async (cartItemId) => {
  try {
    const url = endpoints.cart.removeItem.replace(':cartItemId', cartItemId);
    const res = await apiClient.delete(url);

    if (res.success) {
      return { success: true };
    }
    return { success: false, error: res.error || 'Failed to remove cart item' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

/**
 * Clear entire cart
 */
export const clearCart = async () => {
  try {
    const res = await apiClient.delete(endpoints.cart.clear);

    if (res.success) {
      return { success: true };
    }
    return { success: false, error: res.error || 'Failed to clear cart' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};
