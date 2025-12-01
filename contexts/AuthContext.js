// contexts/AuthContext.js
'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  authLogin,
  authPunchoutLogin,
  authLogout,
  authRefresh,
  getStoredUser,
  isUserAuthenticated,
  hasSelectedCustomer,
  getSelectedCustomer,
  storeSelectedCustomer,
} from '@/lib/api/services/auth';

export const AuthContext = createContext({});

// Backwards-compatible hook: many components import `useAuth` from this module.
// Provide the same API as the previous implementation.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if user is already authenticated
        const authenticated = isUserAuthenticated();
        const userData = getStoredUser();
        const selectedCust = getSelectedCustomer();

        if (authenticated && userData) {
          setUser(userData);
          setIsAuthenticated(true);
          setSelectedCustomer(selectedCust);

          // Attempt to refresh token silently
          try {
            const refreshResult = await authRefresh();
            if (refreshResult.success && refreshResult.data) {
              setUser(refreshResult.data);
            }
          } catch (error) {
            console.error('Silent token refresh failed:', error);
            // Continue with existing auth, don't log out
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setSelectedCustomer(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
        setIsAuthenticated(false);
        setSelectedCustomer(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const result = await authLogin(email, password);

      if (result.success) {
        setUser(result.data);
        setIsAuthenticated(true);

        // If user has a specific customerId (single customer), set it as selected
        if (result.data.customerId) {
          storeSelectedCustomer(result.data.customerId);
          setSelectedCustomer(result.data.customerId);
        } else if (
          result.data.customers && 
          Array.isArray(result.data.customers) && 
          result.data.customers.length === 1
        ) {
          // Also handle single customer in array case
          const singleCustId = result.data.customers[0].customerId || result.data.customers[0].id;
          if (singleCustId) {
            storeSelectedCustomer(singleCustId);
            setSelectedCustomer(singleCustId);
          }
        }

        // Return the data so callers (pages) can react to multi-customer users
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const punchoutLogin = async (sid) => {
    try {
      setLoading(true);
      const result = await authPunchoutLogin(sid);

      if (result.success) {
        setUser(result.data);
        setIsAuthenticated(true);

        // If user has a specific customerId (single customer), set it as selected
        if (result.data.customerId) {
          storeSelectedCustomer(result.data.customerId);
          setSelectedCustomer(result.data.customerId);
        }

        // Return the data so callers (pages) can react to multi-customer users
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Punchout login error:', error);
      return { success: false, error: error.message || 'Punchout login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setSelectedCustomer(null);
      setLoading(false);
    }
  };

  const setCustomerSelected = (customerId) => {
    setSelectedCustomer(customerId);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    selectedCustomer,
    login,
    punchoutLogin,
    logout,
    setCustomerSelected,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};