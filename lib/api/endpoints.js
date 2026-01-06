/**
 * API Endpoint definitions
 * Centralized configuration for all API endpoints
 */

export const endpoints = {
  auth: {
    login: '/api/auth/login',
    punchoutLogin: '/punchout/login',
    refresh: '/api/auth/refresh',
    logout: '/api/auth/logout',
    changePassword: '/api/auth/change-password',
  },
  user: {
    accountDetails: '/api/user/account-details',
    updateAccount: '/api/user/account',
    customers: '/api/user/customers',
    selectCustomer: '/api/user/select-customer',
  },
  orders: {
    list: '/api/erporders',
  },
  quotes: {
    list: '/api/quotes',
    statuses: '/trans-statuses',
    details: '/api/quote/details',
  },
  support: {
    list: '/api/support/cases',
    create: '/api/support/cases/create',
    details: '/api/support/cases/:id',
    update: '/api/support/cases/:id',
    addMessage: '/api/support/cases/messages',
  },
  cart: {
    get: '/api/cart',
    addItem: '/api/cart/items',
    updateItem: '/api/cart/items/:cartItemId',
    removeItem: '/api/cart/items/:cartItemId',
    clear: '/api/cart',
  },
  favorites: {
    createList: '/favorite-list',
    searchLists: '/favorite-list/search',
    getListFavorites: '/favorite-list/:listId/favorites',
    deleteList: '/favorite-list/:id',
    getList: '/favorite-list/:id',
    updateList: '/favorite-list/:id',
    updateListStatus: '/favorite-list/:id/status',
    createFavorite: '/favorite',
    deleteFavorite: '/favorite/:id',
    getFavorite: '/glcodes/query',
    updateFavorite: '/favorite/:id',
    updateFavoriteStatus: '/favorite/:id/status',
  },
  glcodes: {
    query: '/glcodes/query',
    create: '/glcodes',
    update: '/glcodes/:id',
    updateStatus: '/glcodes/:id/status',
    delete: '/glcodes/:id',
    get: '/glcodes/:id',
  },
  products: {
    filter: '/product/filter',
    details: '/product/details/:uuid',
    price: '/product/getprice',
    packingInfo: '/product/packing-info/:uuid',
    inventory: '/product/inventory-by-sku',
    orderHistory: '/product/order-history',
    vendorInventory: '/product/get-vendor-inventory/:uuid',
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
