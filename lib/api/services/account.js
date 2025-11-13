import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { formatAPIError } from '@/lib/utils/api-error';

export const getAccountDetails = async () => {
  try {
    const res = await apiClient.get(endpoints.user.accountDetails);
    if (res.success) return { success: true, data: res.data };
    return { success: false, error: 'Invalid response' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};

export const updateAccount = async (payload) => {
  try {
    const res = await apiClient.put(endpoints.user.updateAccount, payload);
    if (res.success) return { success: true, data: res.data };
    return { success: false, error: 'Invalid response' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
};
