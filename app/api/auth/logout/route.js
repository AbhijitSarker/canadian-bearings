// app/api/auth/logout/route.js
export async function GET(request) {
  try {
    console.log('[API Route] Logout request');

    // Get cookies from the request
    const cookies = request.headers.get('cookie') || '';

    // Call backend API to logout
    const response = await fetch('https://cbmro.com/copdev-api/api/auth/logout', {
      method: 'GET',
      headers: {
        'Cookie': cookies,
      },
      credentials: 'include',
    });

    console.log('[API Route] Backend logout response status:', response.status);

    // Get Set-Cookie headers from backend response (might contain cookie deletion)
    const setCookieHeaders = response.headers.getSetCookie?.() || [];
    console.log('[API Route] Set-Cookie headers:', setCookieHeaders);

    // Create response
    const apiResponse = Response.json(
      { success: true },
      { status: 200 }
    );

    // Forward Set-Cookie headers to client (should include cookie deletion)
    setCookieHeaders.forEach((cookie) => {
      apiResponse.headers.append('Set-Cookie', cookie);
    });

    return apiResponse;
  } catch (error) {
    console.error('[API Route] Logout error:', error);
    return Response.json(
      { success: false, error: error.message || 'An error occurred during logout' },
      { status: 500 }
    );
  }
}
