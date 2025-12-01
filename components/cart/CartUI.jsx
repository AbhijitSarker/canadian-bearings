'use client';

import { useAuth } from '@/contexts/AuthContext';
import FloatingCartButton from './FloatingCartButton';
import CartSidebar from './CartSidebar';

export default function CartUI() {
  const { isAuthenticated, loading, selectedCustomer } = useAuth();

  // Don't render cart UI if not authenticated, still loading, or no customer selected
  if (loading || !isAuthenticated || !selectedCustomer) {
    return null;
  }

  return (
    <>
      <FloatingCartButton />
      <CartSidebar />
    </>
  );
}
