import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { formatAPIError } from '@/lib/utils/api-error';

export const getQuotes = async (pageNumber = 1, pageSize = 10, sortBy = 'createdDate', sortDirection = 'desc', filters = {}) => {
  try {
    const payload = {
      pageNo: pageNumber,
      pageSize,
      sortBy,
      sortDirection,
      startDate: filters.startDate || "",
      endDate: filters.endDate || "",
      statusName: filters.status || "",
    };

    const res = await apiClient.post(endpoints.quotes.list, payload);
    
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

export const getQuoteStatuses = async () => {
  try {
    const url = `${endpoints.quotes.statuses}?transType=estimate`;
    const res = await apiClient.get(url);
    if (res.success) {
      return { success: true, data: res.data };
    }
    return { success: false, error: 'Failed to fetch statuses' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

export const getQuoteDetails = async (quoteNumber) => {
  try {
    const url = `${endpoints.quotes.details}?QuoteNumber=${quoteNumber}`;
    const res = await apiClient.get(url);
    
    if (res.success) {
      return { 
        success: true, 
        data: res.data.body,
      };
    }
    return { success: false, error: 'Failed to fetch quote details' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};
