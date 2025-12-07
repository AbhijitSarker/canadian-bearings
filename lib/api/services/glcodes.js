import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { formatAPIError } from '@/lib/utils/api-error';

/**
 * Search GL Codes
 * @param {Object} params - Search parameters
 */
export const searchGLCodes = async (params) => {
  try {
    const res = await apiClient.post(endpoints.glcodes.query, params);
    if (res.success) {
      return { success: true, data: res.data };
    }
    return { success: false, error: res.error || 'Failed to fetch GL codes' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

/**
 * Create a new GL Code
 * @param {Object} data - GL Code data
 */
export const createGLCode = async (data) => {
  try {
    const res = await apiClient.post(endpoints.glcodes.create, data);
    if (res.success) {
      return { success: true, data: res.data };
    }
    return { success: false, error: res.error || 'Failed to create GL code' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

/**
 * Update a GL Code
 * @param {number} id - GL Code ID
 * @param {Object} data - Update data
 */
export const updateGLCode = async (id, data) => {
  try {
    const url = endpoints.glcodes.update.replace(':id', id);
    const res = await apiClient.put(url, data);
    if (res.success) {
      return { success: true, data: res.data };
    }
    return { success: false, error: res.error || 'Failed to update GL code' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

/**
 * Update GL Code status
 * @param {number} id - GL Code ID
 * @param {boolean} isActive - New status
 */
export const updateGLCodeStatus = async (id, isActive) => {
  try {
    const url = endpoints.glcodes.updateStatus.replace(':id', id);
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
 * Delete a GL Code
 * @param {number} id - GL Code ID
 */
export const deleteGLCode = async (id) => {
  try {
    const url = endpoints.glcodes.delete.replace(':id', id);
    const res = await apiClient.delete(url);
    if (res.success) {
      return { success: true };
    }
    return { success: false, error: res.error || 'Failed to delete GL code' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

/**
 * Get a GL Code by ID
 * @param {number} id - GL Code ID
 */
export const getGLCode = async (id) => {
  try {
    const url = endpoints.glcodes.get.replace(':id', id);
    const res = await apiClient.get(url);
    if (res.success) {
      return { success: true, data: res.data };
    }
    return { success: false, error: res.error || 'Failed to fetch GL code' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};
