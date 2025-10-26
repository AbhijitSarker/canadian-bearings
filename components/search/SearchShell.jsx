"use client"

import React, { useMemo, useState } from "react";
import Filters, { sample } from "./Filters";
import SearchResults from "./SearchResults";
import headphoneImg from "@/assets/header_headphone_image.png";

const mockProducts = [
  {
    id: 1,
    category: "Bearings",
    brand: "SKF",
    type: "Ball Bearings",
    name: "SKF 6203 2ZJEM",
    description: "6203 2ZJEM | Single Row Cylindrical Bore Deep Groove Ball Bearing",
    itemNumber: "I01525229",
    price: 31.89,
    image: headphoneImg,
  },
  {
    id: 2,
    category: "Bearings",
    brand: "SKF",
    type: "Ball Bearings",
    name: "SKF 6204 2ZJEM",
    description: "6204 2ZJEM | Single Row Cylindrical Bore Deep Groove Ball Bearing",
    itemNumber: "I01525230",
    price: 35.5,
    image: headphoneImg,
  },
  {
    id: 3,
    category: "Abrasives",
    brand: "3M",
    type: "Wheel Brushes",
    name: "Abrasive Wheel 100",
    description: "High quality abrasive wheel",
    itemNumber: "A0001",
    price: 12.5,
    image: headphoneImg,
  },
  {
    id: 4,
    category: "Bearings",
    brand: "Chicago Pneumatic",
    type: "Ball Bearings",
    name: "CP Bearing X1",
    description: "Industrial bearing",
    itemNumber: "CP100",
    price: 45.0,
    image: headphoneImg,
  },
];

const SearchShell = () => {
  const [filters, setFilters] = useState({ categories: [], brands: [], types: [] });

  // map selected ids back to labels using the sample data
  const selectedLabels = useMemo(() => {
    const mapIdsToLabels = (itemsDef, ids) => {
      if (!ids || ids.length === 0) return null;
      const map = new Map(itemsDef.map((it) => [it.id, it.label]));
      return ids.map((id) => map.get(id)).filter(Boolean);
    };

    return {
      categories: mapIdsToLabels(sample.categories, filters.categories),
      brands: mapIdsToLabels(sample.brands, filters.brands),
      types: mapIdsToLabels(sample.types, filters.types),
    };
  }, [filters]);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((p) => {
      if (selectedLabels.categories && selectedLabels.categories.length > 0 && !selectedLabels.categories.includes(p.category)) return false;
      if (selectedLabels.brands && selectedLabels.brands.length > 0 && !selectedLabels.brands.includes(p.brand)) return false;
      if (selectedLabels.types && selectedLabels.types.length > 0 && !selectedLabels.types.includes(p.type)) return false;
      return true;
    });
  }, [selectedLabels]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <Filters onChange={setFilters} />
        </div>

        <div className="col-span-12 lg:col-span-9">
          <SearchResults products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default SearchShell;
