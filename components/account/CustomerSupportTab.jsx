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
    <form onSubmit={handleSubmit} className="bg-white rounded-lg sm:rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-3 sm:mb-6">Customer Support</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <div>
          <label className="text-xs sm:text-sm text-gray-700 font-medium block mb-1">First Name</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full rounded-md border border-gray-200 px-3 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>

        <div>
          <label className="text-xs sm:text-sm text-gray-700 font-medium block mb-1">Last Name</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full rounded-md border border-gray-200 px-3 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>

        <div>
          <label className="text-xs sm:text-sm text-gray-700 font-medium block mb-1">Email Address</label>
          <input name="email" value={form.email} onChange={handleChange} className="w-full rounded-md border border-gray-200 px-3 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="hello@example.com" />
        </div>

        <div>
          <label className="text-xs sm:text-sm text-gray-700 font-medium block mb-1">Phone</label>
          <div className="flex items-center gap-1 sm:gap-2">
            <select name="phoneCountryCode" value={form.phoneCountryCode} onChange={handleChange} className="rounded-md border border-gray-200 px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500 whitespace-nowrap">
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="flex-1 rounded-md border border-gray-200 px-3 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="(555) 000-0000" />
          </div>
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <label className="text-xs sm:text-sm text-gray-700 font-medium block mb-1">Comment</label>
        <textarea name="comment" value={form.comment} onChange={handleChange} className="w-full rounded-md border border-gray-200 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm h-20 sm:h-24 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" placeholder="Tell us about your issue..." />
      </div>

      <div className="flex gap-2 sm:gap-3">
        <button type="submit" className="flex-1 sm:flex-none bg-green-600 text-white px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-green-700 transition">Submit</button>
      </div>
    </form>
  );
}
