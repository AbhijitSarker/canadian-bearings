// app/api/auth/login/route.js
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    console.log('[API Route] Login attempt for:', email);

    // Call backend API
    const response = await fetch('https://cbmro.com/copdev-api/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include credentials
      body: JSON.stringify({ email, password }),
    });

    console.log('[API Route] Backend response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[API Route] Backend error:', errorData);
      return Response.json(
        { success: false, error: errorData.message || 'Login failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('[API Route] Backend login successful');

    // Get Set-Cookie headers from backend response
    const setCookieHeaders = response.headers.getSetCookie?.() || [];
    console.log('[API Route] Set-Cookie headers:', setCookieHeaders);

    // Create response with user data
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
    console.error('[API Route] Login error:', error);
    return Response.json(
      { success: false, error: error.message || 'An error occurred during login' },
      { status: 500 }
    );
  }
}
