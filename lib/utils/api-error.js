// lib/utils/api-error.js

/**
 * Format API errors into user-friendly messages
 */
export const formatAuthError = (error) => {
  if (!error) {
    return 'An unknown error occurred';
  }

  // Network error
  if (error.isNetworkError) {
    return 'Network error. Please check your connection.';
  }

  // Auth errors
  if (error.isAuthError) {
    if (error.status === 401) {
      return 'Invalid credentials. Please check your email and password.';
    }
    if (error.status === 403) {
      return 'Access forbidden. You do not have permission to access this resource.';
    }
  }

  // Server errors with specific message
  if (error.message) {
    // Clean up error messages
    const message = String(error.message)
      .replace(/^\[+\"?/, '') // Remove leading brackets and quotes
      .replace(/\"?\]+$/, ''); // Remove trailing quotes and brackets

    return message || 'An error occurred';
  }

  // Error data might contain message
  if (error.data?.message) {
    return String(error.data.message);
  }

  if (error.data?.error) {
    return String(error.data.error);
  }

  // Fallback
  return 'An error occurred. Please try again.';
};

/**
 * Format generic API errors
 */
export const formatAPIError = (error) => {
  if (!error) {
    return 'An unknown error occurred';
  }

  if (error.isNetworkError) {
    return 'Network error. Please check your connection.';
  }

  if (error.message) {
    return String(error.message);
  }

  if (error.data?.message) {
    return String(error.data.message);
  }

  return 'An error occurred. Please try again.';
};

/**
 * Check if error is an authentication error
 */
export const isAuthError = (error) => {
  return error?.isAuthError === true || error?.status === 401 || error?.status === 403;
};

/**
 * Check if error is a network error
 */
export const isNetworkError = (error) => {
  return error?.isNetworkError === true;
};

/**
 * Get error status code
 */
export const getErrorStatus = (error) => {
  return error?.status || 0;
};
