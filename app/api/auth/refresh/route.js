// app/api/auth/refresh/route.js
export async function GET(request) {
  try {
    console.log('[API Route] Refresh token request');

    // Get cookies from the request
    const cookies = request.headers.get('cookie') || '';
    console.log('[API Route] Request cookies:', cookies);

    // Call backend API to refresh
    const response = await fetch('https://cbmro.com/copdev-api/api/auth/refresh', {
      method: 'GET',
      headers: {
        'Cookie': cookies,
      },
      credentials: 'include',
    });

    console.log('[API Route] Backend refresh response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[API Route] Backend refresh error:', errorData);
      return Response.json(
        { success: false, error: 'Token refresh failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('[API Route] Backend refresh successful');

    // Get Set-Cookie headers from backend response
    const setCookieHeaders = response.headers.getSetCookie?.() || [];
    console.log('[API Route] Set-Cookie headers:', setCookieHeaders);

    // Create response
    const apiResponse = Response.json(
      { success: true, data },
      { status: 200 }
    );

    // Forward Set-Cookie headers to client
    setCookieHeaders.forEach((cookie) => {
      apiResponse.headers.append('Set-Cookie', cookie);
    });

    return apiResponse;
  } catch (error) {
    console.error('[API Route] Refresh error:', error);
    return Response.json(
      { success: false, error: error.message || 'An error occurred during refresh' },
      { status: 500 }
    );
  }
}
