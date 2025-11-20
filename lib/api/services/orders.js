import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { formatAPIError } from '@/lib/utils/api-error';

export const getOrders = async (pageNumber = 1, pageSize = 10, sortBy = 'orderId', sortDirection = 'asc', filters = {}) => {
  try {
    const payload = {
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
      startDate: filters.startDate || null,
      endDate: filters.endDate || null,
      shipTo: filters.shipTo || null,
      custPo: filters.custPo || null,
      orderNo: filters.orderNo || null,
      status: filters.status || null,
    };

    const res = await apiClient.post(endpoints.orders.list, payload);
    
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
