// lib/api/services/products.js
import apiClient from '../client';
import { endpoints } from '../endpoints';

/**
 * Product Filter Service
 * Handles product filtering with categories, brands, attributes, and search
 */

/**
 * Filter products based on search criteria
 * @param {Object} payload - Filter criteria
 * @param {string} payload.searchTerm - Search term (optional)
 * @param {number[]} payload.categories - Array of category IDs
 * @param {number[]} payload.brands - Array of brand IDs
 * @param {string[]} payload.attributes - Array of attribute keys (format: "19~|~V-Belt~|~1")
 * @param {number} payload.pageNumber - Page number (1-indexed)
 * @param {number} payload.pageSize - Number of items per page
 * @returns {Promise<Object>} Filter results with products, categories, brands, and attributes
 */
export const filterProducts = async (payload) => {
  try {
    const response = await apiClient.post(endpoints.products.filter, payload);
    return response.data;
  } catch (error) {
    console.error('Error filtering products:', error);
    throw error;
  }
};

/**
 * Build filter payload from state
 * @param {Object} filters - Filter state object
 * @returns {Object} API payload
 */
export const buildFilterPayload = (filters) => {
  return {
    searchTerm: filters.searchTerm || '',
    categories: filters.categories || [],
    brands: filters.brands || [],
    attributes: filters.attributes || [],
    pageNumber: filters.pageNumber || 1,
    pageSize: filters.pageSize || 24,
  };
};

/**
 * Get product details by UUID
 * @param {string} uuid - Product unique identifier
 * @returns {Promise<Object>} Product details
 */
export const getProductDetails = async (uuid) => {
  try {
    const url = endpoints.products.details.replace(':uuid', uuid);
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

/**
 * Get product price by part number
 * @param {string} partNo - Product part number (custSKU or cbSku)
 * @returns {Promise<Object>} Product price details
 */
export const getProductPrice = async (partNo) => {
  try {
    const response = await apiClient.get(`${endpoints.products.price}?partNo=${encodeURIComponent(partNo)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product price:', error);
    throw error;
  }
};

/**
 * Get product packing information by UUID
 * @param {string} uuid - Product unique identifier
 * @returns {Promise<Array>} Packing information array
 */
export const getPackingInfo = async (uuid) => {
  try {
    const url = endpoints.products.packingInfo.replace(':uuid', uuid);
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching packing info:', error);
    throw error;
  }
};

/**
 * Get product inventory by part number
 * @param {string} partNo - Product part number
 * @returns {Promise<Object>} Inventory details with warehouse information
 */
export const getInventory = async (partNo) => {
  try {
    const response = await apiClient.get(`${endpoints.products.inventory}?partNo=${encodeURIComponent(partNo)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};
/**
 * Get product order history
 * @param {Object} payload - Pagination and filter criteria
 * @param {number} payload.productId - Product ID
 * @param {number} payload.pageNumber - Page number
 * @param {number} payload.pageSize - Page size
 * @returns {Promise<Object>} Order history with items and summary
 */
export const getOrderHistory = async (payload) => {
  try {
    const response = await apiClient.post(endpoints.products.orderHistory, payload);
    return response.data;
  } catch (error) {
    console.error('Error fetching order history:', error);
    throw error;
  }
};

/**
 * Get vendor inventory by UUID
 * @param {string} uuid - Product unique identifier
 * @returns {Promise<Object>} Vendor inventory details
 */
export const getVendorInventory = async (uuid) => {
  try {
    const url = endpoints.products.vendorInventory.replace(':uuid', uuid);
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching vendor inventory:', error);
    throw error;
  }
};
