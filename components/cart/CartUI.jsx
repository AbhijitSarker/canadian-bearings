'use client';

import { useAuth } from '@/contexts/AuthContext';
import FloatingCartButton from './FloatingCartButton';
import CartSidebar from './CartSidebar';

export default function CartUI() {
  const { isAuthenticated, loading } = useAuth();

  // Don't render cart UI if not authenticated or still loading
  if (loading || !isAuthenticated) {
    return null;
  }

  return (
    <>
      <FloatingCartButton />
      <CartSidebar />
    </>
  );
}
