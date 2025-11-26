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
      startDate: filters.startDate || null,
      endDate: filters.endDate || null,
      status: filters.status || null,
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
