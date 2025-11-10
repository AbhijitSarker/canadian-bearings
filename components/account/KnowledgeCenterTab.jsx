"use client";

import { useState } from "react";

export default function KnowledgeCenterTab() {
  const [q, setQ] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-medium text-gray-900 mb-4">Knowledge Center</h2>

      <div className="mb-4">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search knowledge base..." className="w-full rounded-md border border-gray-200 px-4 py-2 text-sm" />
      </div>

      <p className="text-gray-600">Browse our knowledge base and resources. Use the search above to find help articles.</p>
    </div>
  );
}

