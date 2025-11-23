// lib/api/endpoints.js

/**
 * API Endpoint definitions
 * Centralized configuration for all API endpoints
 */

export const endpoints = {
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
    changePassword: '/auth/change-password',
  },
  user: {
    accountDetails: '/user/account-details',
    updateAccount: '/user/account',
  },
  orders: {
    list: '/erporders',
  },
  support: {
    list: '/support/cases',
    create: '/support/cases/create',
    details: '/support/cases/:id',
    update: '/support/cases/:id',
    addMessage: '/support/cases/messages',
  },
};

/**
 * Helper function to get endpoint by path
 */
export const getEndpoint = (path) => {
  const keys = path.split('.');
  let endpoint = endpoints;

  for (const key of keys) {
    endpoint = endpoint?.[key];
  }

  return endpoint;
};
