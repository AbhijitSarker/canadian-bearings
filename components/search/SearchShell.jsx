"use client"

import React, { useMemo, useState } from "react";
import Filters, { sample } from "./Filters";
import SearchResults from "./SearchResults";
import headphoneImg from "@/assets/header_headphone_image.png";
import header_macbook_image from "@/assets/header_macbook_image.png";
import header_playstation_image from "@/assets/header_playstation_image.png";
import { Info, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../ui/pagination";

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
      image: header_macbook_image,
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
      image: header_playstation_image,
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
    image:headphoneImg
  },
    {
        id: 5,
        category: "Bearings",
        brand: "SKF",
        type: "Ball Bearings",
        name: "SKF 6205 2RSJEM",
        description: "6205 2RSJEM | Single Row Sealed Deep Groove Ball Bearing",
        itemNumber: "I01525231",
        price: 38.75,
        image: header_macbook_image
    },
    {
        id: 6,
        category: "Abrasives",
        brand: "3M",
        type: "Sanding Discs",
        name: "3M Sanding Disc 150",
        description: "Durable sanding disc for industrial use",
        itemNumber: "A0002",
        price: 15.20,
        image: header_playstation_image
    },
    {
        id: 7,
        category: "Bearings",
        brand: "SKF",
        type: "Roller Bearings",
        name: "SKF NU 205 ECP",
        description: "Cylindrical Roller Bearing for Heavy Loads",
        itemNumber: "I01525232",
        price: 52.10,
        image: headphoneImg
    },
    {
        id: 8,
        category: "Bearings",
        brand: "Chicago Pneumatic",
        type: "Ball Bearings",
        name: "CP Bearing X2",
        description: "High-performance industrial bearing",
        itemNumber: "CP101",
        price: 47.80,
        image: header_macbook_image
    },
    {
        id: 9,
        category: "Abrasives",
        brand: "3M",
        type: "Wheel Brushes",
        name: "Abrasive Wheel 200",
        description: "Heavy-duty abrasive wheel for metal finishing",
        itemNumber: "A0003",
        price: 18.90,
        image: header_playstation_image
    },
    {
        id: 10,
        category: "Bearings",
        brand: "SKF",
        type: "Ball Bearings",
        name: "SKF 6306 2ZJEM",
        description: "6306 2ZJEM | Single Row Deep Groove Ball Bearing",
        itemNumber: "I01525233",
        price: 42.30,
        image: headphoneImg
    },
    {
        id: 11,
        category: "Abrasives",
        brand: "3M",
        type: "Grinding Wheels",
        name: "3M Grinding Wheel 50",
        description: "Precision grinding wheel for industrial applications",
        itemNumber: "A0004",
        price: 22.45,
        image: header_playstation_image
    },
    {
        id: 12,
        category: "Bearings",
        brand: "Chicago Pneumatic",
        type: "Roller Bearings",
        name: "CP Roller Bearing Y1",
        description: "Cylindrical roller bearing for heavy-duty machinery",
        itemNumber: "CP102",
        price: 55.60,
        image: headphoneImg
    },
    {
        id: 13,
        category: "Bearings",
        brand: "SKF",
        type: "Ball Bearings",
        name: "SKF 6207 2RSJEM",
        description: "6207 2RSJEM | Sealed Deep Groove Ball Bearing",
        itemNumber: "I01525234",
        price: 39.95,
        image: header_playstation_image
    },
    {
        id: 14,
        category: "Abrasives",
        brand: "3M",
        type: "Sanding Belts",
        name: "3M Sanding Belt 80",
        description: "High-performance sanding belt for woodworking",
        itemNumber: "A0005",
        price: 17.65,
        image: header_macbook_image
    },
    {
        id: 15,
        category: "Bearings",
        brand: "SKF",
        type: "Roller Bearings",
        name: "SKF NJ 206 ECP",
        description: "Single Row Cylindrical Roller Bearing",
        itemNumber: "I01525235",
        price: 58.20,
        image: header_playstation_image
    },
    {
        id: 16,
        category: "Bearings",
        brand: "Chicago Pneumatic",
        type: "Ball Bearings",
        name: "CP Bearing X3",
        description: "Durable bearing for industrial equipment",
        itemNumber: "CP103",
        price: 49.15,
        image: headphoneImg
    },
    {
        id: 17,
        category: "Abrasives",
        brand: "3M",
        type: "Wheel Brushes",
        name: "Abrasive Wheel 300",
        description: "Industrial-grade abrasive wheel for polishing",
        itemNumber: "A0006",
        price: 20.30,
        image: header_playstation_image
    },
    {
        id: 18,
        category: "Bearings",
        brand: "SKF",
        type: "Ball Bearings",
        name: "SKF 6208 2ZJEM",
        description: "6208 2ZJEM | Deep Groove Ball Bearing with Shields",
        itemNumber: "I01525236",
        price: 44.70,
        image: header_macbook_image
    },
    {
        id: 19,
        category: "Abrasives",
        brand: "3M",
        type: "Sanding Discs",
        name: "3M Sanding Disc 200",
        description: "High-efficiency sanding disc for metalwork",
        itemNumber: "A0007",
        price: 16.80,
        image: header_playstation_image
    },
    {
        id: 20,
        category: "Bearings",
        brand: "Chicago Pneumatic",
        type: "Roller Bearings",
        name: "CP Roller Bearing Y2",
        description: "Heavy-duty roller bearing for industrial use",
        itemNumber: "CP104",
        price: 60.25,
        image: headphoneImg
    },
    {
        id: 21,
        category: "Bearings",
        brand: "SKF",
        type: "Ball Bearings",
        name: "SKF 6307 2RSJEM",
        description: "6307 2RSJEM | Sealed Deep Groove Ball Bearing",
        itemNumber: "I01525237",
        price: 46.90,
        image: header_playstation_image
    },
    {
        id: 22,
        category: "Abrasives",
        brand: "3M",
        type: "Grinding Wheels",
        name: "3M Grinding Wheel 75",
        description: "Durable grinding wheel for precision work",
        itemNumber: "A0008",
        price: 24.10,
        image: headphoneImg
    },
    {
        id: 23,
        category: "Bearings",
        brand: "Chicago Pneumatic",
        type: "Ball Bearings",
        name: "CP Bearing X4",
        description: "Industrial bearing for high-speed applications",
        itemNumber: "CP105",
        price: 50.35,
        image: headphoneImg
    },
    {
        id: 24,
        category: "Abrasives",
        brand: "3M",
        type: "Sanding Belts",
        name: "3M Sanding Belt 120",
        description: "High-quality sanding belt for heavy-duty tasks",
        itemNumber: "A0009",
        price: 19.25,
        image: header_macbook_image
    },
    {
        id: 25,
        category: "Bearings",
        brand: "SKF",
        type: "Roller Bearings",
        name: "SKF NU 207 ECP",
        description: "Cylindrical Roller Bearing for Industrial Machinery",
        itemNumber: "I01525238",
        price: 61.50,
        image: headphoneImg
    }
];

const SearchShell = () => {
  const [filters, setFilters] = useState({ categories: [], brands: [], types: [] });
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("relevance");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

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

  // apply query and sort, then paginate
  const searchedAndSorted = useMemo(() => {
    let list = filteredProducts.slice();
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [filteredProducts, query, sort]);

  const total = searchedAndSorted.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  const paginatedProducts = searchedAndSorted.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-5 ">
      <div className="grid grid-cols-12 gap-4 ">
        <div className="col-span-12 lg:col-span-3 ">
          <Filters onChange={setFilters} />
        </div>

        <div className="col-span-12 lg:col-span-9 border rounded-lg">
            
          <div className="flex items-center justify-between p-4 pb-0">
                     
            <div>
              <p className="font-medium">Showing {total === 0 ? 0 : startIndex + 1} - {endIndex} of {total} items</p>
            </div>
                      <div className="text-sm text-neutral-500 italic flex items-center gap-1"> <Info size={18} strokeWidth={2} /> <p>Photos may not represent actual items. Refer to name and product specs for all details</p></div>
          </div>
          <SearchResults
            products={paginatedProducts}
            query={query}
            setQuery={setQuery}
            sort={sort}
            setSort={setSort}
            view={view}
            setView={setView}
          />
          {/* shadcn pagination */}
          <div className="flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-3">
              <p className="text-sm text-neutral-600">Page {page} of {Math.max(1, Math.ceil(total / pageSize))}</p>
            </div>

            <div className="flex-1">
              <Pagination>
                <PaginationContent className="justify-center">
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      size="icon"
                      className={`h-9 w-9 rounded-full flex items-center justify-center ${page === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </PaginationLink>
                  </PaginationItem>

                  {/* page numbers with simple ellipsis logic */}
                  {(() => {
                    const totalPages = Math.max(1, Math.ceil(total / pageSize));
                    const items = [];

                    function pushPage(n) {
                      items.push(
                        <PaginationItem key={"p-" + n}>
                          <PaginationLink
                            onClick={() => setPage(n)}
                            isActive={n === page}
                            size="icon"
                            className={`h-9 w-9 rounded-full flex items-center justify-center ${n === page ? 'bg-white ring-1 ring-neutral-200' : 'bg-white'}`}
                          >
                            {n}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    if (totalPages <= 7) {
                      for (let i = 1; i <= totalPages; i++) pushPage(i);
                    } else {
                      // always show first
                      pushPage(1);
                      if (page > 4) {
                        items.push(<PaginationItem key="e-1"><PaginationEllipsis /></PaginationItem>);
                      }

                      const start = Math.max(2, Math.min(page - 1, totalPages - 4));
                      const end = Math.min(totalPages - 1, start + 2);

                      for (let i = start; i <= end; i++) pushPage(i);

                      if (end < totalPages - 1) {
                        items.push(<PaginationItem key="e-2"><PaginationEllipsis /></PaginationItem>);
                      }

                      pushPage(totalPages);
                    }

                    return items;
                  })()}

                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setPage((p) => Math.min(Math.max(1, Math.ceil(total / pageSize)), p + 1))}
                      size="icon"
                      className={`h-9 w-9 rounded-full flex items-center justify-center ${page >= Math.ceil(Math.max(1, total) / pageSize) ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-neutral-600">{pageSize} / page</label>
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                className="rounded-md border px-3 py-1 bg-white text-sm"
              >
                <option value={10}>10 / page</option>
                <option value={25}>25 / page</option>
                <option value={50}>50 / page</option>
                <option value={100}>100 / page</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchShell;
