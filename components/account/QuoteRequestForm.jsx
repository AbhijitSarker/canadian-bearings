"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function QuoteRequestForm({ initialUser, onClose, onSubmit }) {
  const [form, setForm] = useState({
    firstName: initialUser?.firstName || "",
    lastName: initialUser?.lastName || "",
    email: initialUser?.email || "",
    phoneCountryCode: "+1",
    phoneNumber: "(555) 000-0000",
    comment: "",
  });

  const [lines, setLines] = useState([
    { id: 1, part: "", description: "", qty: "", file: null },
    { id: 2, part: "", description: "", qty: "", file: null },
    { id: 3, part: "", description: "", qty: "", file: null },
    { id: 4, part: "", description: "", qty: "", file: null },
  ]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const addLine = () => {
    setLines((prev) => [
      ...prev,
      { id: prev.length ? prev[prev.length - 1].id + 1 : 1, part: "", description: "", qty: "", file: null },
    ]);
  };

  const removeLine = (id) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  };

  const updateLine = (id, key, value) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, [key]: value } : l)));
  };

  const handleFile = (id, file) => {
    updateLine(id, "file", file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email) {
      toast.error("Please enter your email.");
      return;
    }
    toast.success("Quote request submitted — our team will contact you shortly.");
    console.log("Quote submitted", { form, lines });
    
    // Call the parent's onSubmit callback if provided
    if (onSubmit) {
      onSubmit({ form, lines });
    }
    
    // Close the form
    onClose();
  };

  return (
    <form className="space-y-6 border p-6 rounded-lg shadow-sm" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-900">Request for Quote</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleFormChange}
            className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="First name"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleFormChange}
            className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Last name"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <div className="relative mt-1">
            <input
              name="email"
              value={form.email}
              onChange={handleFormChange}
              className="block w-full rounded-md border border-gray-200 px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="hello@example.com"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <div className="flex items-center gap-2 mt-1">
            <select
              name="phoneCountryCode"
              value={form.phoneCountryCode}
              onChange={handleFormChange}
              className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleFormChange}
              className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="(555) 000-0000"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Comment</label>
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleFormChange}
          className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Placeholder text..."
        />
      </div>

      {/* Quote lines table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Serial</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Part</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Description</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Qty</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Upload Image (jpg / pdf)</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, idx) => (
              <tr key={line.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900 align-middle">{idx + 1}</td>
                <td className="px-4 py-3">
                  <input
                    value={line.part}
                    onChange={(e) => updateLine(line.id, "part", e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Part"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    value={line.description}
                    onChange={(e) => updateLine(line.id, "description", e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Description"
                  />
                </td>
                <td className="px-4 py-3 w-24">
                  <input
                    value={line.qty}
                    onChange={(e) => updateLine(line.id, "qty", e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Qty"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-md cursor-pointer text-sm font-medium hover:bg-green-700">
                      + Upload
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFile(line.id, e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                    <span className="text-gray-500 text-xs">{line.file ? line.file.name : ""}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => removeLine(line.id)}
                    className="text-red-500 hover:text-red-700 text-lg"
                    aria-label={`Remove line ${idx + 1}`}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4">
        <button 
          type="button" 
          onClick={addLine} 
          className="px-4 py-2 rounded-md border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Add Line
        </button>

        <div className="ml-auto flex items-center gap-3">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500">Please fill out the above form to connect directly with our sales team. Alternatively, you may email your request to sales@canadianbearings.com or call 905-670-6700</p>
    </form>
  );
}
