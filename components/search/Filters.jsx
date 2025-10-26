"use client"

import React, { useCallback } from "react";
import FilterSection from "./FilterSection";

export const sample = {
  categories: [
    { id: "cat-1", label: "Bearings", count: 85 },
    { id: "cat-2", label: "Abrasives", count: 4 },
    { id: "cat-3", label: "Baldor Reliance", count: 2 },
    { id: "cat-4", label: "C.S Osborne & Co", count: 50 },
    { id: "cat-5", label: "Carlisle Food Service Pro", count: 569 },
    { id: "cat-6", label: "Chicago Pneumatic", count: 67 },
  ],
  brands: [
    { id: "brand-1", label: "3M", count: 85 },
    { id: "brand-2", label: "Alvord Polk", count: 4 },
    { id: "brand-3", label: "Baldor Reliance", count: 2 },
    { id: "brand-4", label: "C.S Osborne & Co", count: 50 },
  ],
  types: [
    { id: "type-1", label: "Wheel Brushes", count: 350 },
    { id: "type-2", label: "Internal Tube Brushes", count: 1245 },
  ],
};

const Filters = ({ onChange }) => {
  const handle = useCallback(
    (key) => (selected) => {
      onChange && onChange((prev) => ({ ...prev, [key]: selected }));
    },
    [onChange]
  );

  return (
    <aside>
      <FilterSection title="Categories" items={sample.categories} onChange={handle("categories")} />
      <FilterSection title="Brands" items={sample.brands} onChange={handle("brands")} />
      <FilterSection title="Product Type" items={sample.types} onChange={handle("types")} />
    </aside>
  );
};

export default Filters;
