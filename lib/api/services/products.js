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
