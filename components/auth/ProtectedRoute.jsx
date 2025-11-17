// components/auth/ProtectedRoute.jsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Loading from '@/app/loading';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, selectedCustomer } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
        router.push(`/auth/signin?returnUrl=${returnUrl}`);
      }
      // If authenticated but no customer selected, redirect to select-account
      else if (!selectedCustomer) {
        router.push(`/auth/select-account`);
      }
    }
  }, [isAuthenticated, loading, selectedCustomer, router]);

  // Show loading state
  if (loading) {
    return (
      <Loading />
    );
  }

  // Redirect if not authenticated or no customer selected
  if (!isAuthenticated || !selectedCustomer) {
    return null;
  }

  // Render protected content
  return <>{children}</>;
}