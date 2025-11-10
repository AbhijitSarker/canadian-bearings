"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function CustomerSupportTab() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneCountryCode: "+1",
    phoneNumber: "(555) 000-0000",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email) {
      toast.error("Please enter your email.");
      return;
    }
    toast.success("Support request submitted. We'll be in touch shortly.");
    console.log("Customer support submitted", form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-medium text-gray-900 mb-4">Customer Support</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-gray-700">First Name</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="text-sm text-gray-700">Last Name</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="text-sm text-gray-700">Email Address</label>
          <input name="email" value={form.email} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm" placeholder="hello@example.com" />
        </div>

        <div>
          <label className="text-sm text-gray-700">Phone</label>
          <div className="flex items-center gap-2 mt-1">
            <select name="phoneCountryCode" value={form.phoneCountryCode} onChange={handleChange} className="rounded-md border border-gray-200 px-3 py-2 text-sm">
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm" placeholder="(555) 000-0000" />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm text-gray-700">Comment</label>
        <textarea name="comment" value={form.comment} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm h-24" placeholder="Placeholder text..." />
      </div>

      <div className="flex items-center">
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md">Submit</button>
      </div>
    </form>
  );
}
