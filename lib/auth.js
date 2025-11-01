// lib/auth.js
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = 'https://cbmro.com/cbvmi-api/api';

// Token storage keys
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';

/**
 * Store authentication data in localStorage
 */
export const storeAuthData = (data) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
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
 * Get stored token
 */
export const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Get stored refresh token
 */
export const getRefreshToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Get stored user data
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
  
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

/**
 * Login function
 */
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      // Normalize different server error shapes into a friendly string:
      // - { message: "..." }
      // - { message: ["...", ...] }
      // - ["...", ...]
      // - { errors: [...] }
      // - any other JSON -> stringify fallback
      let errMsg = 'Login failed';

      if (errorData) {
        if (typeof errorData === 'string') {
          errMsg = errorData;
        } else if (Array.isArray(errorData)) {
          // array of messages
          errMsg = errorData.join(', ');
        } else if (errorData.message) {
          if (Array.isArray(errorData.message)) {
            errMsg = errorData.message.join(', ');
          } else {
            errMsg = String(errorData.message);
          }
        } else if (errorData.errors) {
          if (Array.isArray(errorData.errors)) {
            errMsg = errorData.errors.join(', ');
          } else {
            errMsg = JSON.stringify(errorData.errors);
          }
        } else {
          // fallback to a compact JSON string
          try {
            errMsg = JSON.stringify(errorData);
          } catch (e) {
            errMsg = 'Login failed';
          }
        }
      }

      // Trim surrounding quotes/brackets if server returned a JSON-stringified array/string
      errMsg = String(errMsg).replace(/^\[+\"?/, '').replace(/\"?\]+$/, '');

      // Return error details instead of throwing so callers can show server message
      return { success: false, error: errMsg || 'Login failed' };
    }

    const data = await response.json();
    storeAuthData(data);
    return { success: true, data };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      error: error.message || 'An error occurred during login' 
    };
  }
};

/**
 * Refresh access token
 */
export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    
    // Update stored tokens
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    
    return { success: true, token: data.token };
  } catch (error) {
    console.error('Token refresh error:', error);
    clearAuthData();
    return { success: false, error: error.message };
  }
};

/**
 * Logout function
 */
export const logout = () => {
  clearAuthData();
  if (typeof window !== 'undefined') {
    window.location.href = '/auth/signin';
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  
  if (isTokenExpired(token)) {
    // Token expired, try to refresh
    return false;
  }
  
  return true;
};

/**
 * Get authorization header
 */
export const getAuthHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Authenticated fetch wrapper
 */
export const authenticatedFetch = async (url, options = {}) => {
  let token = getToken();
  
  // Check if token is expired
  if (token && isTokenExpired(token)) {
    const refreshResult = await refreshAccessToken();
    if (!refreshResult.success) {
      logout();
      throw new Error('Session expired. Please login again.');
    }
    token = refreshResult.token;
  }
  
  const headers = {
    ...options.headers,
    ...getAuthHeader(),
  };
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    // If unauthorized, try to refresh token once
    if (response.status === 401) {
      const refreshResult = await refreshAccessToken();
      if (refreshResult.success) {
        // Retry request with new token
        headers.Authorization = `Bearer ${refreshResult.token}`;
        return fetch(url, { ...options, headers });
      } else {
        logout();
        throw new Error('Session expired. Please login again.');
      }
    }
    
    return response;
  } catch (error) {
    console.error('Authenticated fetch error:', error);
    throw error;
  }
};