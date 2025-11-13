// lib/api/README.md
# Cookie-Based Authentication System

This is a clean, reusable, and optimized API calling system with cookie-based authentication for the Canadian Bearings application.

## Architecture

The authentication system is organized into the following layers:

```
/lib
├── /api
│   ├── client.js           # Base API client with fetch configuration
│   ├── endpoints.js        # Centralized endpoint definitions
│   ├── /services
│   │   └── auth.js        # Authentication business logic
│   └── /hooks
│       └── useAuth.js     # React hook for accessing auth context
├── /utils
│   └── api-error.js       # Standardized error handling
└── auth.js                # (Old - can be removed)
```

## Key Features

- **Cookie-Based Authentication**: Browser automatically handles cookie sending/receiving
- **Automatic Token Refresh**: 401 errors trigger automatic token refresh with request retry
- **Error Handling**: Standardized error formatting for user-friendly messages
- **Singleton Pattern**: Single API client instance for consistent state management
- **Concurrent Request Safety**: Prevents multiple simultaneous token refresh requests
- **SSR-Safe**: Client-side operations safely detect server environment

## Components

### 1. API Client (`lib/api/client.js`)

The core API client that handles:
- All HTTP requests (GET, POST, PUT, PATCH, DELETE)
- Cookie-based authentication
- Automatic token refresh on 401
- Standardized error handling

**Usage:**
```javascript
import { apiClient } from '@/lib/api/client';

const response = await apiClient.post('/auth/login', {
  email: 'user@example.com',
  password: 'password'
});
```

### 2. Endpoints (`lib/api/endpoints.js`)

Centralized endpoint definitions:

```javascript
export const endpoints = {
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
  },
};
```

### 3. Auth Services (`lib/api/services/auth.js`)

Business logic for authentication:

- **`authLogin(email, password)`** - Login user
- **`authRefresh()`** - Refresh access token
- **`authLogout()`** - Logout user
- **`getStoredUser()`** - Get stored user data
- **`isUserAuthenticated()`** - Check auth status
- **`getCurrentUser()`** - Get current user

**Usage:**
```javascript
import { authLogin, authLogout } from '@/lib/api/services/auth';

const result = await authLogin('user@example.com', 'password');
if (result.success) {
  // User is logged in
}
```

### 4. Error Utilities (`lib/utils/api-error.js`)

Standardized error formatting:

- **`formatAuthError(error)`** - Format authentication errors
- **`formatAPIError(error)`** - Format general API errors
- **`isAuthError(error)`** - Check if error is auth-related
- **`isNetworkError(error)`** - Check if error is network-related
- **`getErrorStatus(error)`** - Get HTTP status code

### 5. useAuth Hook (`lib/api/hooks/useAuth.js`)

React hook for accessing authentication context:

```javascript
import { useAuth } from '@/lib/api/hooks/useAuth';

const { user, isAuthenticated, loading, login, logout } = useAuth();
```

### 6. AuthContext (`contexts/AuthContext.js`)

Global authentication state management:

**Context Value:**
```javascript
{
  user: {
    email: string,
    firstName: string,
    lastName: string,
    customerId?: number,
    custNo?: number,
    custName?: string,
    customers?: Array
  } | null,
  isAuthenticated: boolean,
  loading: boolean,
  login: (email, password) => Promise<{ success, error? }>,
  logout: () => Promise<void>
}
```

## API Endpoints

### Login
- **Endpoint:** `POST /auth/login`
- **Base URL:** `https://cbmro.com/copdev-api/api`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }
  ```
- **Response:** User data object with customer information

### Refresh Token
- **Endpoint:** `GET /auth/refresh`
- **Headers:** Cookies sent automatically
- **Response:** Updated user data

### Logout
- **Endpoint:** `GET /auth/logout`
- **Response:** Success message

## Usage Examples

### Sign In Page
```javascript
import { useAuth } from '@/lib/api/hooks/useAuth';

export default function SignInPage() {
  const { login } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    
    if (result.success) {
      // Redirect to dashboard
      router.push('/account');
    } else {
      // Show error
      setError(result.error);
    }
  };
}
```

### Protected Component
```javascript
import { useAuth } from '@/lib/api/hooks/useAuth';

export default function AccountPage() {
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) return <Loading />;
  if (!isAuthenticated) return <Redirect />;
  
  return <div>Welcome, {user.firstName}</div>;
}
```

### Making Authenticated API Calls
```javascript
import { apiClient } from '@/lib/api/client';

const response = await apiClient.get('/some-protected-endpoint');
// Cookies are automatically included
// 401 errors automatically trigger token refresh
```

## Authentication Flow

1. **Initial Load:**
   - AuthContext checks localStorage for stored user
   - Attempts silent token refresh
   - Sets authenticated state

2. **Login:**
   - User submits credentials
   - API client sends login request
   - Backend sets authentication cookie
   - User data stored in localStorage
   - User redirected to requested page

3. **Protected Requests:**
   - API client automatically includes cookies
   - If 401 received, automatically attempts refresh
   - Request is retried with new token
   - If refresh fails, user is logged out

4. **Logout:**
   - Calls logout endpoint
   - Clears localStorage
   - Redirects to login page

## Error Handling

All errors are standardized with the following structure:

```javascript
{
  status: number,           // HTTP status code
  message: string,          // User-friendly error message
  error?: any,              // Original error object
  isAuthError?: boolean,    // True for 401/403
  isNetworkError?: boolean, // True for network errors
}
```

## Configuration

Base API URL is set in `lib/api/client.js`:

```javascript
const API_BASE_URL = 'https://cbmro.com/copdev-api/api';
```

Endpoints are defined in `lib/api/endpoints.js` and can be extended:

```javascript
export const endpoints = {
  auth: { /* ... */ },
  users: {
    profile: '/users/profile',
    // Add more as needed
  },
};
```

## Migration from Old System

The old `lib/auth.js` file can be removed. Update imports:

**Before:**
```javascript
import { login, logout, getUser } from '@/lib/auth';
```

**After:**
```javascript
import { authLogin, authLogout, getStoredUser } from '@/lib/api/services/auth';
import { useAuth } from '@/lib/api/hooks/useAuth';
```

## Best Practices

1. **Use the hook for UI components:**
   ```javascript
   const { user, isAuthenticated, login } = useAuth();
   ```

2. **Use services for business logic:**
   ```javascript
   const result = await authLogin(email, password);
   ```

3. **Use API client for custom requests:**
   ```javascript
   const response = await apiClient.get('/custom-endpoint');
   ```

4. **Handle errors appropriately:**
   ```javascript
   try {
     const result = await login(email, password);
     if (!result.success) {
       setError(result.error);
     }
   } catch (error) {
     console.error('Unexpected error:', error);
   }
   ```

## SSR Considerations

All functions safely check for server environment:

```javascript
if (typeof window === 'undefined') return; // Server-side, skip
```

This prevents errors when code runs on the server.
