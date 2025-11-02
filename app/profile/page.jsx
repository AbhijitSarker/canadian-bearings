"use client";

import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6 h-[500px]">
        Profile Page
      </div>
    </ProtectedRoute>
  );
}
