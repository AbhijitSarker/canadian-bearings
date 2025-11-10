"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

export default function QuoteTab() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
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
    // Minimal validation
    if (!form.email) {
      toast.error("Please enter your email.");
      return;
    }

    toast.success("Quote request submitted — our team will contact you shortly.");
    console.log("Quote submitted", { form, lines });
  };

  return (
    <form className="bg-white rounded-lg shadow-sm border border-gray-200 p-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-medium text-gray-900 mb-4">Request for Quote</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-gray-700">First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleFormChange}
            className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
            placeholder="First name"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleFormChange}
            className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
            placeholder="Last name"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">Email Address</label>
          <div className="relative mt-1">
            <input
              name="email"
              value={form.email}
              onChange={handleFormChange}
              className="block w-full rounded-md border border-gray-200 px-10 py-2 text-sm"
              placeholder="hello@example.com"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-700">Phone</label>
          <div className="flex items-center gap-2 mt-1">
            <select
              name="phoneCountryCode"
              value={form.phoneCountryCode}
              onChange={handleFormChange}
              className="rounded-md border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleFormChange}
              className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm"
              placeholder="(555) 000-0000"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm text-gray-700">Comment</label>
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleFormChange}
          className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm h-24"
          placeholder="Placeholder text..."
        />
      </div>

      {/* Quote lines table */}
      <div className="overflow-x-auto border border-gray-100 rounded-md mb-4">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Serial</th>
              <th className="p-3 text-left">Part</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">Upload Image (jpg / pdf)</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, idx) => (
              <tr key={line.id} className="border-t border-gray-100">
                <td className="p-3 align-middle">{idx + 1}</td>
                <td className="p-3">
                  <input
                    value={line.part}
                    onChange={(e) => updateLine(line.id, "part", e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-2 py-1 text-sm"
                    placeholder="Part"
                  />
                </td>
                <td className="p-3">
                  <input
                    value={line.description}
                    onChange={(e) => updateLine(line.id, "description", e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-2 py-1 text-sm"
                    placeholder="Description"
                  />
                </td>
                <td className="p-3 w-24">
                  <input
                    value={line.qty}
                    onChange={(e) => updateLine(line.id, "qty", e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-2 py-1 text-sm"
                    placeholder="Qty"
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-md cursor-pointer text-sm">
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
                <td className="p-3">
                  <button
                    type="button"
                    onClick={() => removeLine(line.id)}
                    className="text-red-500 text-lg"
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

      <div className="flex items-center gap-4 mb-4">
        <button type="button" onClick={addLine} className="px-4 py-2 rounded-md border border-gray-200 text-sm">
          Add Line
        </button>

        <button type="submit" className="ml-auto bg-green-600 text-white px-6 py-2 rounded-md text-sm">
          Submit
        </button>
      </div>

      <p className="text-xs text-gray-500">Please fill out the above form to connect directly with our sales team. Alternatively, you may email your request to sales@canadianbearings.com or call 905-670-6700</p>
    </form>
  );
}
