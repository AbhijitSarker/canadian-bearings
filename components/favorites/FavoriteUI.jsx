'use client';

import { useAuth } from '@/contexts/AuthContext';
import FavoriteSidebar from './FavoriteSidebar';

export default function FavoriteUI() {
  const { isAuthenticated, loading, selectedCustomer } = useAuth();

  // Don't render favorite UI if not authenticated, still loading, or no customer selected
  if (loading || !isAuthenticated || !selectedCustomer) {
    return null;
  }

  return (
    <>
      <FavoriteSidebar />
    </>
  );
}
