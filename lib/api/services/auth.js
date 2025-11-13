// lib/api/services/auth.js
import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { formatAuthError } from '@/lib/utils/api-error';

/**
 * User data storage key
 */
const USER_KEY = 'user_data';

/**
 * Store user data in localStorage
 */
const storeUserData = (userData) => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(
      USER_KEY,
      JSON.stringify({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        customerId: userData.customerId || null,
        custNo: userData.custNo || null,
        custName: userData.custName || null,
        customers: userData.customers || null,
      })
    );
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

/**
 * Get stored user data from localStorage
 */
export const getStoredUser = () => {
  if (typeof window === 'undefined') return null;

  try {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Clear user data from localStorage
 */
const clearUserData = () => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
};

/**
 * Login with email and password
 * Sets cookies server-side, stores user data client-side
 */
export const authLogin = async (email, password) => {
  try {
    const response = await apiClient.post(endpoints.auth.login, {
      email,
      password,
    });

    if (response.success && response.data) {
      // Store user data from response
      storeUserData(response.data);

      return {
        success: true,
        data: response.data,
      };
    }

    return {
      success: false,
      error: 'Login failed: Invalid response format',
    };
  } catch (error) {
    const errorMessage = formatAuthError(error);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Refresh access token
 * Backend handles cookie refresh, we update user data
 */
export const authRefresh = async () => {
  try {
    const response = await apiClient.get(endpoints.auth.refresh);

    if (response.success && response.data) {
      // Update user data from refresh response
      storeUserData(response.data);

      return {
        success: true,
        data: response.data,
      };
    }

    return {
      success: false,
      error: 'Token refresh failed: Invalid response format',
    };
  } catch (error) {
    const errorMessage = formatAuthError(error);
    console.error('[authRefresh] Error:', errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Logout user
 * Clears server-side cookies and client-side data
 */
export const authLogout = async () => {
  try {
    await apiClient.get(endpoints.auth.logout);
  } catch (error) {
    console.error('[authLogout] Error calling logout endpoint:', error.message);
    // Continue logout even if endpoint fails
  } finally {
    clearUserData();
  }
};

/**
 * Change password
 * payload: { currentPassword, newPassword, confirmPassword }
 */
export const changePassword = async ({ currentPassword, newPassword, confirmPassword }) => {
  try {
    const response = await apiClient.post(endpoints.auth.changePassword, {
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (response.success) {
      return { success: true, data: response.data };
    }

    return { success: false, error: response?.error || 'Change password failed' };
  } catch (error) {
    const errorMessage = formatAuthError(error);
    return { success: false, error: errorMessage };
  }
};

/**
 * Check if user is authenticated
 */
export const isUserAuthenticated = () => {
  const user = getStoredUser();
  return user !== null;
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = () => {
  return getStoredUser();
};
