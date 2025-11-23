import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { formatAPIError } from '@/lib/utils/api-error';

export const getSupportCases = async (pageNumber = 1, pageSize = 10, sortBy = 'dateCreated', sortDirection = 'desc', filters = {}) => {
  try {
    const payload = {
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
      search: filters.search || null,
      statusId: filters.statusId || null,
      priorityId: filters.priorityId || null,
      categoryId: filters.categoryId || null,
      caseNo: filters.caseNo || null,
      startDate: filters.startDate || null,
      endDate: filters.endDate || null,
    };

    const res = await apiClient.post(endpoints.support.list, payload);
    
    if (res.success) {
      return { 
        success: true, 
        data: res.data,
      };
    }
    return { success: false, error: 'Invalid response' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

export const createSupportCase = async (data) => {
  try {
    const payload = {
      title: data.title,
      statusId: 1, // Default to Open
      priorityId: data.priorityId || 1, // Default to Low
      categoryId: data.categoryId || 1, // Default to Order Issues
      isActive: true,
      // Add other fields if necessary based on API requirement
    };

    const res = await apiClient.post(endpoints.support.create, payload);

    if (res.success) {
      return { success: true, data: res.data };
    }
    return { success: false, error: res.error || 'Failed to create case' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

export const getSupportCaseDetails = async (id) => {
  try {
    const url = endpoints.support.details.replace(':id', id);
    const res = await apiClient.get(url);

    if (res.success) {
      return { success: true, data: res.data };
    }
    return { success: false, error: res.error || 'Failed to fetch case details' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

export const addMessageToCase = async (caseUniqueId, messageText) => {
  try {
    const payload = {
      caseUniqueId,
      messageText,
      isFromSupport: false, // User is sending the message
      isInternal: false,
    };

    const res = await apiClient.post(endpoints.support.addMessage, payload);

    if (res.success) {
      return { success: true, data: res.data };
    }
    return { success: false, error: res.error || 'Failed to send message' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};
