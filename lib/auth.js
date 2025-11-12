// lib/auth.js
const API_BASE_URL = 'https://cbmro.com/copdev-api/api';
const NEXT_API_URL = '/api'; // Our Next.js API routes

// Storage key for user data (stored in localStorage, not token)
const USER_KEY = 'user_data';

/**
 * Store user data in localStorage (cookies are handled server-side)
 */
export const storeAuthData = (data) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(USER_KEY, JSON.stringify({
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company,
      lastLogin: data.lastLogin,
    }));
  } catch (error) {
    console.error('Error storing auth data:', error);
  }
};

/**
 * Get stored user data (cookies are sent automatically by browser)
 */
export const getUser = () => {
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
 * Clear all authentication data
 */
export const clearAuthData = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(USER_KEY);
};

/**
 * Login function - Uses Next.js API route which handles cookies server-side
 */
export const login = async (email, password) => {
  try {
    console.log('[Auth] Starting login with email:', email);
    
    const response = await fetch(`${NEXT_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important: Include cookies
      body: JSON.stringify({ email, password }),
    });

    console.log('[Auth] Login response status:', response.status);
    console.log('[Auth] Cookies after login:', document.cookie);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      // Normalize different server error shapes into a friendly string
      let errMsg = 'Login failed';

      if (errorData) {
        if (typeof errorData === 'string') {
          errMsg = errorData;
        } else if (Array.isArray(errorData)) {
          errMsg = errorData.join(', ');
        } else if (errorData.message) {
          if (Array.isArray(errorData.message)) {
            errMsg = errorData.message.join(', ');
          } else {
            errMsg = String(errorData.message);
          }
        } else if (errorData.error) {
          errMsg = String(errorData.error);
        } else {
          try {
            errMsg = JSON.stringify(errorData);
          } catch (e) {
            errMsg = 'Login failed';
          }
        }
      }

      errMsg = String(errMsg).replace(/^\[+\"?/, '').replace(/\"?\]+$/, '');
      return { success: false, error: errMsg || 'Login failed' };
    }

    const data = await response.json();
    console.log('[Auth] Login successful, storing user data:', data.data);
    
    if (data.success && data.data) {
      storeAuthData(data.data);
    } else if (data.data) {
      storeAuthData(data.data);
    }
    
    // Log cookies again after storage
    console.log('[Auth] Final cookies after login:', document.cookie);
    
    return { success: true, data: data.data || data };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      error: error.message || 'An error occurred during login' 
    };
  }
};

/**
 * Refresh access token - Server handles cookie refresh via API route
 */
export const refreshAccessToken = async () => {
  try {
    console.log('[Auth] Refreshing token...');
    
    const response = await fetch(`${NEXT_API_URL}/auth/refresh`, {
      method: 'GET',
      credentials: 'include', // Include cookies in request
    });

    console.log('[Auth] Refresh response status:', response.status);

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    if (data.success && data.data) {
      console.log('[Auth] Token refreshed successfully');
      storeAuthData(data.data);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Token refresh error:', error);
    clearAuthData();
    return { success: false, error: error.message };
  }
};

/**
 * Logout function
 */
export const logout = async () => {
  try {
    console.log('[Auth] Logging out...');
    
    // Call logout API route to clear server-side cookies
    await fetch(`${NEXT_API_URL}/auth/logout`, {
      method: 'GET',
      credentials: 'include',
    });
    
    console.log('[Auth] Logout API called');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    clearAuthData();
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/signin';
    }
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  const user = getUser();
  return user !== null;
};

/**
 * Get authorization header (deprecated - cookies handle authentication now)
 */
export const getAuthHeader = () => {
  return {};
};

/**
 * Debug function to check authentication status and cookies
 */
export const debugAuth = () => {
  if (typeof window === 'undefined') return;
  
  const user = getUser();
  console.log('[Auth Debug] User data:', user);
  console.log('[Auth Debug] Cookies:', document.cookie);
  console.log('[Auth Debug] Is Authenticated:', isAuthenticated());
};

/**
 * Authenticated fetch wrapper - Cookies are sent automatically
 */
export const authenticatedFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include', // Include cookies in request
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    // Log response status for debugging
    console.log(`[authenticatedFetch] ${options.method || 'GET'} ${url} - Status: ${response.status}`);
    
    // Handle 403 Forbidden
    if (response.status === 403) {
      console.error('Access forbidden (403). You may not have permission to access this resource.');
      throw new Error('Access forbidden. You may not have permission to access this resource.');
    }
    
    // If unauthorized, try to refresh token once
    if (response.status === 401) {
      console.log('[authenticatedFetch] Unauthorized (401), attempting token refresh...');
      const refreshResult = await refreshAccessToken();
      if (refreshResult.success) {
        // Retry request with refreshed cookie
        console.log('[authenticatedFetch] Token refreshed, retrying request...');
        return fetch(url, {
          ...options,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });
      } else {
        await logout();
        throw new Error('Session expired. Please login again.');
      }
    }
    
    return response;
  } catch (error) {
    console.error('Authenticated fetch error:', error);
    throw error;
  }
};