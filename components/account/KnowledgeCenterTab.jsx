"use client";

import { useState } from "react";

export default function KnowledgeCenterTab() {
  const [q, setQ] = useState("");

  return (
    <div className="bg-white rounded-lg sm:rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-3 sm:mb-4">Knowledge Center</h2>

      <div className="mb-4 sm:mb-6">
        <input 
          value={q} 
          onChange={(e) => setQ(e.target.value)} 
          placeholder="Search knowledge base..." 
          className="w-full rounded-md border border-gray-200 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500" 
        />
      </div>

      <p className="text-gray-600 text-sm sm:text-base">Browse our knowledge base and resources. Use the search above to find help articles.</p>
    </div>
  );
}

