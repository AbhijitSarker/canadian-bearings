// lib/api/client.js
const API_BASE_URL = 'https://cbmro.com/copdev-api/api';

/**
 * API Client with cookie-based authentication
 * Handles automatic token refresh on 401 responses
 */
class APIClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.isRefreshing = false;
    this.refreshPromise = null;
  }

  /**
   * Make an API request with automatic cookie handling and token refresh
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      credentials: 'include', // Always include cookies
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      let response = await fetch(url, config);

      // Handle 401 Unauthorized - attempt token refresh
      if (response.status === 401) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;
          try {
            // Attempt to refresh token
            const refreshResponse = await fetch(`${this.baseURL}/auth/refresh`, {
              method: 'GET',
              credentials: 'include',
            });

            if (refreshResponse.ok) {
              // Token refreshed, retry original request
              response = await fetch(url, config);
            } else {
              // Refresh failed, logout user
              this.handleAuthFailure();
            }
          } finally {
            this.isRefreshing = false;
            this.refreshPromise = null;
          }
        } else {
          // Wait for ongoing refresh to complete
          if (!this.refreshPromise) {
            this.refreshPromise = new Promise((resolve) => {
              const checkInterval = setInterval(() => {
                if (!this.isRefreshing) {
                  clearInterval(checkInterval);
                  resolve();
                }
              }, 100);
            });
          }
          await this.refreshPromise;
          // Retry request after refresh
          response = await fetch(url, config);
        }
      }

      // Handle 403 Forbidden
      if (response.status === 403) {
        throw {
          status: 403,
          message: 'Access forbidden. You may not have permission to access this resource.',
          isAuthError: true,
        };
      }


      let data = null;
      const contentType = response.headers.get('content-type') || '';
      const text = await response.text();

      if (text) {
        if (contentType.includes('application/json')) {
          try {
            data = JSON.parse(text);
          } catch (err) {
            // If JSON parse fails, fall back to raw text to avoid throwing.
            console.error('Failed to parse JSON response:', err);
            data = text;
          }
        } else {
          data = text;
        }
      } else {
        data = null;
      }

      // Check for errors in non-2xx responses
      if (!response.ok) {
        throw {
          status: response.status,
          message: data?.message || data?.error || 'API request failed',
          data,
          isAuthError: response.status === 401 || response.status === 403,
        };
      }

      return {
        success: true,
        status: response.status,
        data,
      };
    } catch (error) {
      // Handle network errors
      if (error instanceof TypeError) {
        throw {
          status: 0,
          message: 'Network error. Please check your connection.',
          error,
          isNetworkError: true,
        };
      }

      // Re-throw API errors
      if (error.status !== undefined) {
        throw error;
      }

      // Wrap unknown errors
      throw {
        status: 0,
        message: error.message || 'An unexpected error occurred',
        error,
      };
    }
  }

  /**
   * GET request
   */
  get(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'GET',
      ...options,
    });
  }

  /**
   * POST request
   */
  post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });
  }

  /**
   * PUT request
   */
  put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    });
  }

  /**
   * PATCH request
   */
  patch(endpoint, body, options = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      ...options,
    });
  }

  /**
   * DELETE request
   */
  delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      ...options,
    });
  }

  /**
   * Handle authentication failure
   */
  handleAuthFailure() {
    if (typeof window !== 'undefined') {
      // Clear auth data
      try {
        localStorage.removeItem('user_data');
      } catch (e) {
        console.error('Error clearing auth data:', e);
      }

      // Redirect to login
      window.location.href = '/auth/signin';
    }
  }
}

// Export singleton instance
export const apiClient = new APIClient();

export default apiClient;
