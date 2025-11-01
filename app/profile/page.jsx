"use client";

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    address: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        company: user.company || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Minimal local save: show toast. Replace with real API call when available.
    toast.success('Profile saved');
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    toast.success('Address saved');
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6">
        <div className="mb-6 rounded-md bg-blue-50 p-6">
          <h1 className="text-2xl font-semibold">My Account</h1>
          <p className="text-sm text-gray-600 mt-1">We have over 430 Service Centers conveniently located across North America. Please use the search form below to find the Canadian Service Center near you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1 bg-white border rounded p-4">
            <nav className="space-y-2 text-sm">
              <Link href="/profile" className="block px-3 py-2 rounded bg-green-50 text-green-700 font-medium">My Account</Link>
              <a className="block px-3 py-2 rounded hover:bg-gray-50">Order History</a>
              <a className="block px-3 py-2 rounded hover:bg-gray-50">Password and Security</a>
              <a className="block px-3 py-2 rounded hover:bg-gray-50">Quote</a>
              <a className="block px-3 py-2 rounded hover:bg-gray-50">Knowledge Center</a>
              <a className="block px-3 py-2 rounded hover:bg-gray-50">Customer Support</a>
            </nav>
          </aside>

          <main className="md:col-span-3 space-y-6">
            <form onSubmit={handleSaveProfile} className="bg-white border rounded p-6">
              <h2 className="text-lg font-medium mb-4">Personal Details</h2>
              <p className="text-sm text-gray-500 mb-4">Your profile is visible to your connected users.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">First Name</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">Company Name</label>
                  <input name="company" value={form.company} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">Email</label>
                  <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button type="button" className="px-4 py-2 border rounded text-sm">Back</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded text-sm">Save</button>
              </div>
            </form>

            <form onSubmit={handleSaveAddress} className="bg-white border rounded p-6">
              <h2 className="text-lg font-medium mb-4">Shopping Address</h2>
              <p className="text-sm text-gray-500 mb-4">Your profile is visible to your connected users.</p>

              <div className="grid gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Address</label>
                  <input name="address" value={form.address} onChange={handleChange} className="w-full border rounded p-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Street</label>
                    <input name="street" value={form.street} onChange={handleChange} className="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">City/Town</label>
                    <input name="city" value={form.city} onChange={handleChange} className="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Zip/Postal Code</label>
                    <input name="postalCode" value={form.postalCode} onChange={handleChange} className="w-full border rounded p-2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">State/Province/Region</label>
                    <input name="province" value={form.province} onChange={handleChange} className="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Country</label>
                    <input name="country" value={form.country} onChange={handleChange} className="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded p-2" />
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <button type="button" className="px-4 py-2 border rounded text-sm">Back</button>
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded text-sm">Save</button>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
