// components/auth/ProtectedRoute.jsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Loading from '@/app/loading';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Redirect to login with return URL
      const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
      router.push(`/auth/signin?returnUrl=${returnUrl}`);
    }
  }, [isAuthenticated, loading, router]);

  // Show loading state
  if (loading) {
    return (
      <Loading />
    );
  }

  // If not authenticated, don't render children (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  // Render protected content
  return <>{children}</>;
}