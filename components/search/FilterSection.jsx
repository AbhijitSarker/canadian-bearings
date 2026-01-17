"use client"

import React, { useState, useMemo } from "react";
import SearchLineIcon from "@/assets/icons/serachLine";
import { ChevronDown, ChevronUp } from "lucide-react";

const FilterSection = ({
  title,
  items = [],
  selected = [], // Array of selected IDs
  onChange,
  // viewAllBehavior: 'expand' (default) | 'link' | 'modal'
  viewAllBehavior = "expand",
  viewAllUrl,
  onViewAll,
}) => {
  const [open, setOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [expandedAll, setExpandedAll] = useState(false);

  // Convert selected prop to Set for efficient lookup, normalizing to strings for loose comparison
  const selectedSet = useMemo(() => new Set(selected.map(String)), [selected]);

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter((it) => it.label.toLowerCase().includes(q));
  }, [items, query]);

  const toggle = (id) => {
    // Work with strings to ensure consistent matching
    const idStr = String(id);
    const next = new Set(selectedSet);
    if (next.has(idStr)) next.delete(idStr);
    else next.add(idStr);
    onChange && onChange(Array.from(next));
  };

  return (
    <div className="mb-6 bg-white rounded-lg border border-[#E9EAEB] p-4 overflow-auto">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left"
        aria-expanded={open}
      >
        <h4 className="text-lg font-medium text-neutral-900">{title}</h4>
        <span className="text-2xl text-neutral-600">{open ? <ChevronDown /> : <ChevronUp />}</span>
      </button>

      {open && (
        <div className="mt-4">
          <div className="mb-3 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchLineIcon />
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-lg border border-neutral-200 px-10 py-2 text-sm focus:outline-none"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="text-[12px] text-neutral-600 bg-white border border-neutral-200 rounded-md px-2 py-1">⌘1</div>
            </div>
          </div>

          <ul
            className={
              "space-y-3 pr-1 " +
              (expandedAll ? "" : "max-h-48 overflow-auto")
            }
          >
            {filtered.map((it) => (
              <li key={it.id} className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSet.has(String(it.id))}
                    onChange={() => toggle(it.id)}
                    className="w-5 h-5 rounded-sm border border-neutral-300 text-emerald-600 focus:ring-0"
                  />
                  <span className="text-sm text-neutral-800">{it.label}</span>
                  <span className="text-sm text-neutral-800">{it.unit}</span>
                </label>
                <span className="text-sm text-neutral-500">{it.count}</span>
              </li>
            ))}
          </ul>

          <div className="mt-3">
            {viewAllBehavior === "expand" && (
              <button
                onClick={() => setExpandedAll((s) => !s)}
                className="text-emerald-600 font-medium text-sm"
              >
                {expandedAll ? "Show Less" : "View All"}
              </button>
            )}

            {viewAllBehavior === "link" && viewAllUrl && (
              <a href={viewAllUrl} className="text-emerald-600 font-medium text-sm">
                View All
              </a>
            )}

            {viewAllBehavior === "modal" && (
              <button
                onClick={() => onViewAll && onViewAll()}
                className="text-emerald-600 font-medium text-sm"
              >
                View All
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
