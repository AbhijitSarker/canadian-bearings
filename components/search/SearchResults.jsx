"use client"

import React, { useMemo, useState } from "react";
import ProductCard from "../ui/product-card";
import Image from "next/image";

const SearchResults = ({ products = [] }) => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("relevance");

  const results = useMemo(() => {
    let list = products.slice();
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, query, sort]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex-1">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search within results..."
            className="w-full rounded-md border px-4 py-3"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-neutral-600">Sort by</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-md border px-3 py-2 bg-white"
          >
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
