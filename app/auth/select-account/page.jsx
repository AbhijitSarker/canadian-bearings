"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api/client';
import { storeSelectedCustomer } from '@/lib/api/services/auth';

export default function SelectAccountPage() {
  const router = useRouter();
  const { setCustomerSelected } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError('');
      try {
        const resp = await apiClient.get('/user/customers');

        if (!resp || !resp.success) {
          throw new Error((resp && resp.message) || 'Failed to fetch customers');
        }

        const data = resp.data;

        // Normalize shape
        const normalized = Array.isArray(data)
          ? data.map((c) => ({
              customerId: c.customerId ?? c.customer_id ?? c.id,
              custNo: c.custNo ?? c.cust_no ?? c.custNo,
              name: c.name ?? c.custName ?? c.custName ?? `${c.custNo ?? ''}`,
            }))
          : [];

        setCustomers(normalized);
        if (normalized.length === 1) {
          // Auto-select and submit if only one customer
          await submitSelection(normalized[0].customerId);
        } else if (normalized.length > 0) {
          setSelected(normalized[0].customerId);
        }
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError(err.message || 'Failed to load accounts');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const submitSelection = async (customerIdArg) => {
    const customerId = customerIdArg ?? selected;
    if (!customerId) return;

    setSubmitting(true);
    setError('');
    try {
      const resp = await apiClient.post('/user/select-customer', { customerId });

      if (!resp || !resp.success) {
        throw new Error((resp && resp.message) || 'Failed to select account');
      }

      // Store selected customer in localStorage and update context
      storeSelectedCustomer(customerId);
      setCustomerSelected(customerId);

      // Success: navigate to account page
      toast.success('Account selected');
      router.push('/account');
    } catch (err) {
      console.error('Select customer error:', err);
      setError(err.message || 'Failed to select account');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-start w-full md:w-1/2 p-6 md:p-16 relative min-h-0">
      <div className="absolute top-4 right-4 text-sm md:top-6 md:right-8">
        <p>
          Need to go back?{' '}
          <Link href="/auth/signin" className="text-green-600 font-medium">
            Sign In
          </Link>
        </p>
      </div>

      <div className="max-w-lg w-full mx-auto">
        <h2 className="text-2xl font-semibold mb-6 mt-6 md:mt-0 text-gray-800">Select Account</h2>

        {loading ? (
          <div className="text-center text-gray-500">Loading accounts...</div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>
        ) : customers.length === 0 ? (
          <div className="text-gray-600">No accounts available for this user.</div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitSelection();
            }}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Choose account</label>
              <select
                value={selected ?? ''}
                onChange={(e) => setSelected(Number(e.target.value))}
                disabled={submitting}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
              >
                {customers.map((c) => (
                  <option key={c.customerId} value={c.customerId}>
                    {c.name ?? `${c.custNo}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="bg-green-600 text-white rounded-lg px-6 py-2 hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submitting ? 'Selecting...' : 'Select Account'}
              </button>

              <Link href="/auth/signin" className="border border-green-600 text-green-600 rounded-lg px-6 py-2 hover:bg-green-50 transition">
                ← Back
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
