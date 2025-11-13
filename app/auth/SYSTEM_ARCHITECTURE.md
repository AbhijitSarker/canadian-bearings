// SYSTEM_ARCHITECTURE.md
# System Architecture - Cookie-Based Authentication

## 🏗️ System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT APPLICATION                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    React Components                          │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │  │
│  │  │ Sign In Page │  │Account Pages │  │Protected Routes  │   │  │
│  │  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘   │  │
│  │         │                 │                    │             │  │
│  │         └─────────────────┴────────────────────┘             │  │
│  │                          │                                   │  │
│  │                ┌─────────▼──────────┐                        │  │
│  │                │  useAuth() Hook    │                        │  │
│  │                │  /lib/api/hooks/   │                        │  │
│  │                │    useAuth.js      │                        │  │
│  │                └─────────┬──────────┘                        │  │
│  └────────────────────────────┼──────────────────────────────┬─┘  │
│                              │                              │     │
│  ┌────────────────────────────▼──────────────────────────────▼──┐  │
│  │             AuthContext (Global State)                      │  │
│  │  • user data                                               │  │
│  │  • isAuthenticated                                         │  │
│  │  • login() / logout() functions                           │  │
│  └────────────────────────┬────────────────────────────────────┘  │
│                          │                                        │
│                          │ Makes API calls via                    │
│                          │                                        │
│  ┌───────────────────────▼────────────────────────────────────┐   │
│  │              API Services Layer                            │   │
│  │  ┌──────────────────────────────────────────────────────┐  │   │
│  │  │  /lib/api/services/auth.js                          │  │   │
│  │  │  • authLogin(email, password)                       │  │   │
│  │  │  • authRefresh()                                    │  │   │
│  │  │  • authLogout()                                     │  │   │
│  │  │  • getStoredUser()                                  │  │   │
│  │  └──────────────────────┬───────────────────────────────┘  │   │
│  │                        │                                   │   │
│  │  ┌──────────────────────▼───────────────────────────────┐  │   │
│  │  │        Error Handling Utils                          │  │   │
│  │  │  /lib/utils/api-error.js                            │  │   │
│  │  │  • formatAuthError()                                │  │   │
│  │  │  • isAuthError()                                    │  │   │
│  │  │  • isNetworkError()                                 │  │   │
│  │  └──────────────────────┬───────────────────────────────┘  │   │
│  │                        │                                   │   │
│  │  ┌──────────────────────▼───────────────────────────────┐  │   │
│  │  │         API Client                                   │  │   │
│  │  │  /lib/api/client.js                                 │  │   │
│  │  │  • Centralized fetch wrapper                        │  │   │
│  │  │  • Cookie-based auth                               │  │   │
│  │  │  • 401 interception & retry                         │  │   │
│  │  │  • Standardized errors                              │  │   │
│  │  └──────────────────────┬───────────────────────────────┘  │   │
│  │                        │                                   │   │
│  │  ┌──────────────────────▼───────────────────────────────┐  │   │
│  │  │    Endpoints Config                                 │  │   │
│  │  │  /lib/api/endpoints.js                              │  │   │
│  │  │  • /auth/login                                      │  │   │
│  │  │  • /auth/refresh                                    │  │   │
│  │  │  • /auth/logout                                     │  │   │
│  │  └──────────────────────┬───────────────────────────────┘  │   │
│  └───────────────────────────┼──────────────────────────────────┘   │
│                              │                                     │
│  ┌───────────────────────────▼──────────────────────────────────┐  │
│  │            Browser Storage & Cookies                        │  │
│  │  ┌─────────────────────────────────────────────────────┐    │  │
│  │  │  localStorage                                      │    │  │
│  │  │  • user_data (email, firstName, etc)              │    │  │
│  │  └─────────────────────────────────────────────────────┘    │  │
│  │  ┌─────────────────────────────────────────────────────┐    │  │
│  │  │  Cookies (HTTP-Only)                              │    │  │
│  │  │  • Auth token (set by server)                      │    │  │
│  │  │  • Automatically sent with requests                │    │  │
│  │  └─────────────────────────────────────────────────────┘    │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                   HTTPS Connection
                         │
┌────────────────────────▼──────────────────────────────────────────┐
│                    BACKEND API SERVER                             │
│           (https://cbmro.com/copdev-api/api)                     │
├────────────────────────────────────────────────────────────────────┤
│                                                                   │
│  POST /auth/login                                                │
│  • Validates credentials                                         │
│  • Sets HTTP-Only cookie                                         │
│  • Returns user data                                             │
│                                                                   │
│  GET /auth/refresh                                               │
│  • Validates cookie                                              │
│  • Refreshes token                                               │
│  • Returns updated user data                                     │
│                                                                   │
│  GET /auth/logout                                                │
│  • Clears server-side session                                    │
│  • Clears cookie                                                 │
│  • Returns success                                               │
│                                                                   │
│  Other Protected Endpoints                                       │
│  • All require valid cookie                                      │
│  • Auto-refresh on 401                                           │
│                                                                   │
└────────────────────────────────────────────────────────────────────┘
```

## 🔄 Request/Response Flow Diagrams

### 1. Login Flow
```
┌──────────────────────────────────────────────────────────────────┐
│ STEP 1: User Enters Credentials                                  │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                    Sign In Form
                    (email, password)
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│ STEP 2: Submit to AuthContext.login()                           │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│ STEP 3: authLogin() calls apiClient.post()                      │
│ ─────────────────────────────────────────────────────────────────│
│ POST https://cbmro.com/copdev-api/api/auth/login               │
│ Body: { email, password }                                       │
│ Credentials: include                                            │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│ STEP 4: Backend Returns Response                                │
│ ─────────────────────────────────────────────────────────────────│
│ Status: 200 OK                                                  │
│ Headers: Set-Cookie: auth-token=xxx; HttpOnly; SameSite=Lax   │
│ Body: {                                                         │
│   email, firstName, lastName,                                   │
│   customerId, custNo, custName,                                 │
│   customers[]                                                   │
│ }                                                               │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│ STEP 5: Frontend Processes Response                             │
│ ─────────────────────────────────────────────────────────────────│
│ 1. Browser stores Set-Cookie automatically                      │
│ 2. AuthContext stores user_data in localStorage                 │
│ 3. AuthContext updates isAuthenticated = true                   │
│ 4. AuthContext updates user = userData                          │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│ STEP 6: Redirect & Success                                      │
│ ─────────────────────────────────────────────────────────────────│
│ • Redirect to home page or returnUrl                            │
│ • Show success toast                                            │
│ • Ready for authenticated requests                              │
└──────────────────────────────────────────────────────────────────┘
```

### 2. Protected API Call Flow
```
┌──────────────────────────────────────────────────────────────────┐
│ Component calls: apiClient.get('/protected-endpoint')           │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│ API Client Prepares Request                                     │
│ ─────────────────────────────────────────────────────────────────│
│ • Method: GET                                                   │
│ • URL: https://cbmro.com/copdev-api/api/protected-endpoint     │
│ • Credentials: include                                          │
│ • Headers: Content-Type: application/json                       │
│                                                                 │
│ Browser automatically adds:                                     │
│ • Cookie: auth-token=xxx (from storage)                        │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│ Backend Validates Request                                       │
│ ─────────────────────────────────────────────────────────────────│
│ IF token is valid:                                              │
│   → Return 200 OK with data                                     │
│                                                                 │
│ IF token is expired:                                            │
│   → Return 401 Unauthorized                                     │
└────────────────────────┬─────────────────────────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         │ (Token Valid)                 │ (Token Expired)
         ▼                               ▼
    ┌────────────┐              ┌──────────────────┐
    │ Return 200 │              │ Return 401       │
    │ with data  │              │ Unauthorized     │
    └────────────┘              └────────┬─────────┘
         │                               │
         ▼                               ▼
    ┌────────────┐         ┌────────────────────────────┐
    │Success!    │         │ API Client Detects 401     │
    │Return data │         ├────────────────────────────┤
    │to component│         │ Calls authRefresh()        │
    └────────────┘         └────────────┬───────────────┘
                                        │
                        ┌───────────────▼─────────────────┐
                        │ POST /auth/refresh              │
                        │ with cookie                     │
                        │ (Backend refreshes token)       │
                        └───────────────┬─────────────────┘
                                        │
                        ┌───────────────▼─────────────────┐
                        │ Backend Returns Refreshed Token │
                        │ Sets new cookie                 │
                        └───────────────┬─────────────────┘
                                        │
                        ┌───────────────▼─────────────────┐
                        │ API Client Retries Original     │
                        │ Request with new cookie         │
                        └───────────────┬─────────────────┘
                                        │
                        ┌───────────────▼─────────────────┐
                        │ Backend Validates New Token     │
                        │ Returns 200 OK with data        │
                        └───────────────┬─────────────────┘
                                        │
                                        ▼
                                   ┌────────────┐
                                   │ Success!   │
                                   │ Return data│
                                   └────────────┘
```

### 3. Logout Flow
```
┌──────────────────────────────────────────────────────────────────┐
│ Component calls: useAuth().logout()                             │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│ Logout Process Begins                                           │
│ ─────────────────────────────────────────────────────────────────│
│ 1. Calls authLogout() service                                   │
│ 2. Attempts to reach /auth/logout endpoint                      │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│ GET https://cbmro.com/copdev-api/api/auth/logout               │
│ with Cookie: auth-token=xxx                                    │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│ Backend Logout Handler                                          │
│ ─────────────────────────────────────────────────────────────────│
│ • Invalidates session                                           │
│ • Clears auth cookie                                            │
│ • Returns success or error (both ok)                            │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│ Frontend Cleanup (in finally block)                             │
│ ─────────────────────────────────────────────────────────────────│
│ 1. Remove user_data from localStorage                           │
│ 2. Update AuthContext: user = null                              │
│ 3. Update AuthContext: isAuthenticated = false                  │
│ 4. (Cookie automatically cleared by browser)                    │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│ Redirect to Signin Page                                         │
│ ─────────────────────────────────────────────────────────────────│
│ window.location.href = '/auth/signin'                          │
└──────────────────────────────────────────────────────────────────┘
```

## 📊 Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                     User Interface Layer                            │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────────────┐  │
│  │  Sign In     │  │  Protected   │  │  Account Settings       │  │
│  │  Page        │  │  Pages       │  │  Components             │  │
│  └──────┬───────┘  └──────┬───────┘  └───────────┬─────────────┘  │
│         │                 │                       │                │
│         └─────────────────┴───────────────────────┘                │
│                          │                                         │
│                          ▼                                         │
│                 ┌──────────────────┐                              │
│                 │ useAuth() Hook   │                              │
│                 │ Access Context   │                              │
│                 └────────┬─────────┘                              │
│                          │                                         │
└──────────────────────────┼──────────────────────────────────────┬─┘
                           │                                      │
                ┌──────────▼──────────┐                          │
                │ AuthContext         │◄─────────────────────────┘
                │ (Provider + Hook)   │
                │                     │
                │ State:              │
                │ • user              │
                │ • isAuthenticated   │
                │ • loading           │
                │                     │
                │ Functions:          │
                │ • login()           │
                │ • logout()          │
                └────────┬────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
   ┌─────────┐      ┌─────────┐    ┌──────────────┐
   │authLogin│      │authLogout│   │authRefresh   │
   │(services)│     │(services)│   │(services)    │
   └────┬────┘      └────┬────┘    └───────┬──────┘
        │                │                 │
        └────────────────┼─────────────────┘
                         │
                         ▼
                  ┌──────────────┐
                  │  apiClient   │
                  │              │
                  │ • get()      │
                  │ • post()     │
                  │ • put()      │
                  │ • delete()   │
                  │ • patch()    │
                  └────────┬─────┘
                           │
                    ┌──────┴──────┐
                    │ Interceptors│
                    ├──────┬──────┤
                    │ 401? │ 403? │
                    ├──────┴──────┤
                    │ Refresh?    │
                    │ Retry?      │
                    └──────┬──────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   Fetch      │
                    │   API        │
                    └──────┬───────┘
                           │
                           ▼
                  ┌────────────────────┐
                  │ Browser Handles:   │
                  │ • Add cookies      │
                  │ • HTTPS/CORS       │
                  └────────┬───────────┘
                           │
                           ▼
                  ┌──────────────────────────┐
                  │  Backend API Server      │
                  │  (cbmro.com/copdev-api)  │
                  └──────────────────────────┘
```

## 🔐 Security Flow Diagram

```
┌──────────────────────────────────────────────────────────┐
│            SECURITY & DATA FLOW                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Token Storage Strategy:                                │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Server-Side (SECURE)                             │  │
│  │ • HTTP-Only Cookie                               │  │
│  │ • Cannot be accessed by JavaScript               │  │
│  │ • Automatically sent with requests               │  │
│  │ • Cannot be stolen via XSS attacks               │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  Client-Side (USER DATA ONLY)                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │ localStorage (NOT TOKEN)                         │  │
│  │ • Stores user_data object (email, name, etc)     │  │
│  │ • Used for quick UI access                       │  │
│  │ • Not authentication itself                       │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  XSS Protection:                                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Even if localStorage is compromised:             │  │
│  │ • Attacker only gets user data (not token)       │  │
│  │ • Token remains in HTTP-Only cookie              │  │
│  │ • Cannot make authenticated requests             │  │
│  │ • API calls require valid token in cookie        │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  CSRF Protection:                                       │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Browser Security Features:                       │  │
│  │ • SameSite cookie attribute                      │  │
│  │ • Origin/Referer headers validated               │  │
│  │ • Cookie not accessible across origins           │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

## 📈 State Management Flow

```
┌─────────────────────────────────────────────────────────────┐
│              AuthContext State Machine                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  INITIAL STATE:                                           │
│  loading: true                                            │
│  user: null                                               │
│  isAuthenticated: false                                   │
│         │                                                 │
│         ▼                                                 │
│  ┌──────────────────────────────────────┐               │
│  │ Check localStorage                   │               │
│  │ + Try silent refresh                 │               │
│  └──────────────┬───────────────────────┘               │
│         ┌──────┴──────┐                                  │
│         │ (Found)     │ (Not Found)                       │
│         ▼             ▼                                   │
│  ┌────────────┐ ┌──────────────┐                        │
│  │AUTHENTICATED│ │NOT LOGGED IN │                        │
│  │loading:false│ │loading:false │                        │
│  │user: data  │ │user: null    │                        │
│  │isAuth: true│ │isAuth: false │                        │
│  └────┬───────┘ └──────┬───────┘                        │
│       │                │                                 │
│       │                ▼                                 │
│       │         ┌──────────────────────┐               │
│       │         │ User clicks "Sign In"│               │
│       │         └──────────┬───────────┘               │
│       │                   │                             │
│       │                   ▼                             │
│       │         ┌──────────────────────┐               │
│       │         │ Call login()         │               │
│       │         │ loading: true        │               │
│       │         └──────────┬───────────┘               │
│       │                   │                             │
│       │         ┌─────────┴──────────┐                │
│       │         │ (Success)         │ (Failure)       │
│       │         ▼                   ▼                 │
│       │    ┌────────────┐     ┌──────────┐           │
│       │    │loading:false│    │loading:false│         │
│       └───►│user: data  │    │isAuth:false│         │
│            │isAuth:true │    │error msg   │         │
│            └─────┬──────┘    └────────────┘         │
│                  │                  ▲                │
│                  │                  │                │
│                  ▼                  │                │
│         ┌──────────────────┐       │                │
│         │User clicks Logout│       │                │
│         └──────────┬───────┘       │                │
│                    │               │                │
│                    ▼               │                │
│         ┌──────────────────────┐   │                │
│         │ Call logout()        │   │                │
│         │ Clear cookies        │   │                │
│         │ Clear localStorage   │   │                │
│         │ loading: false       │   │                │
│         │ user: null           │   │                │
│         │ isAuth: false        │   │                │
│         └──────────┬───────────┘   │                │
│                    │               │                │
│                    └───────────────┘                │
│                         │                          │
│                         ▼                          │
│                 ┌──────────────────┐              │
│                 │ Redirect to      │              │
│                 │ /auth/signin     │              │
│                 └──────────────────┘              │
│                                                   │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 Key Flow Takeaways

1. **Login**: Credentials → Backend → Cookie Set → User Data Stored → Redirect
2. **Protected Call**: Component → APIClient → Request with Cookie → Success or 401
3. **401 Handling**: Detect 401 → Call Refresh → Retry Original → Continue
4. **Logout**: Clear Cookie → Clear localStorage → Redirect to Signin
5. **Security**: Token in HTTP-Only Cookie, User Data in localStorage, No XSS vulnerability

---

**System Status:** ✅ Complete and Ready for Integration

