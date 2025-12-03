import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { formatAPIError } from '@/lib/utils/api-error';

/**
 * Create a new favorite list
 * @param {Object} data - List data
 * @param {string} data.name - List name
 * @param {string} data.description - List description
 * @param {boolean} data.isShared - Is list shared
 * @param {boolean} data.isEditable - Is list editable
 * @param {string} data.sharingNote - Sharing note
 */
export const createFavoriteList = async (data) => {
  try {
    const res = await apiClient.post(endpoints.favorites.createList, data);
    if (res.success) {
      return { success: true, data: res.data };
    }
    return { success: false, error: res.error || 'Failed to create favorite list' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

/**
 * Search favorite lists
 * @param {Object} params - Search parameters
 */
export const searchFavoriteLists = async (params) => {
  try {
    const res = await apiClient.post(endpoints.favorites.searchLists, params);
    if (res.success) {
      return { success: true, data: res.data };
    }
    return { success: false, error: res.error || 'Failed to fetch favorite lists' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

/**
 * Get favorites by list ID
 * @param {number} listId - Favorite list ID
 * @param {Object} params - Search parameters
 */
export const getFavoritesByList = async (listId, params) => {
  try {
    const url = endpoints.favorites.getListFavorites.replace(':listId', listId);
    const res = await apiClient.post(url, params);
    if (res.success) {
      return { success: true, data: res.data };
    }
    return { success: false, error: res.error || 'Failed to fetch favorites' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

/**
 * Delete a favorite list
 * @param {number} id - List ID
 */
export const deleteFavoriteList = async (id) => {
  try {
    const url = endpoints.favorites.deleteList.replace(':id', id);
    const res = await apiClient.delete(url);
    if (res.success) {
      return { success: true };
    }
    return { success: false, error: res.error || 'Failed to delete favorite list' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

/**
 * Get a favorite list by ID
 * @param {number} id - List ID
 */
export const getFavoriteList = async (id) => {
  try {
    const url = endpoints.favorites.getList.replace(':id', id);
    const res = await apiClient.get(url);
    if (res.success) {
      return { success: true, data: res.data };
    }
    return { success: false, error: res.error || 'Failed to fetch favorite list' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

/**
 * Update a favorite list
 * @param {number} id - List ID
 * @param {Object} data - Update data
 */
export const updateFavoriteList = async (id, data) => {
  try {
    const url = endpoints.favorites.updateList.replace(':id', id);
    const res = await apiClient.put(url, data);
    if (res.success) {
      return { success: true, data: res.data };
    }
    return { success: false, error: res.error || 'Failed to update favorite list' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

/**
 * Update favorite list status
 * @param {number} id - List ID
 * @param {boolean} isActive - New status
 */
export const updateFavoriteListStatus = async (id, isActive) => {
  try {
    const url = endpoints.favorites.updateListStatus.replace(':id', id);
    const res = await apiClient.put(url, { isActive });
    if (res.success) {
      return { success: true };
    }
    return { success: false, error: res.error || 'Failed to update status' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

/**
 * Create a favorite item
 * @param {Object} data - Favorite data
 * @param {number} data.favoriteListId - List ID
 * @param {number} data.productId - Product ID
 * @param {string} data.sku - SKU
 * @param {boolean} data.isActive - Active status
 */
export const createFavorite = async (data) => {
  try {
    const res = await apiClient.post(endpoints.favorites.createFavorite, data);
    if (res.success) {
      return { success: true, data: res.data };
    }
    return { success: false, error: res.error || 'Failed to add favorite' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

/**
 * Delete a favorite item
 * @param {number} id - Favorite ID
 */
export const deleteFavorite = async (id) => {
  try {
    const url = endpoints.favorites.deleteFavorite.replace(':id', id);
    const res = await apiClient.delete(url);
    if (res.success) {
      return { success: true };
    }
    return { success: false, error: res.error || 'Failed to remove favorite' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

/**
 * Update a favorite item
 * @param {number} id - Favorite ID
 * @param {Object} data - Update data
 */
export const updateFavorite = async (id, data) => {
  try {
    const url = endpoints.favorites.updateFavorite.replace(':id', id);
    const res = await apiClient.put(url, data);
    if (res.success) {
      return { success: true, data: res.data };
    }
    return { success: false, error: res.error || 'Failed to update favorite' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};
