// contexts/AuthContext.js
'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  authLogin,
  authLogout,
  authRefresh,
  getStoredUser,
  isUserAuthenticated,
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

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if user is already authenticated
        const authenticated = isUserAuthenticated();
        const userData = getStoredUser();

        if (authenticated && userData) {
          setUser(userData);
          setIsAuthenticated(true);

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
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
        setIsAuthenticated(false);
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
        return { success: true };
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

  const logout = async () => {
    try {
      setLoading(true);
      await authLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};