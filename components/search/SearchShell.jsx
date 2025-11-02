"use client"

import React, { useEffect, useMemo, useState } from "react";
import Filters, { sample } from "./Filters";
import SearchResults from "./SearchResults";
import { Info, ChevronLeft, ChevronRight } from "lucide-react";
import searchData from "@/data/search-data.json";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../ui/pagination";

const SearchShell = ({ initialQuery = "" }) => {
  const [filters, setFilters] = useState({ categories: [], brands: [], types: [] });
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState("relevance");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Update query when initialQuery changes
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

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
    return searchData.products.filter((p) => {
      if (selectedLabels.categories?.length > 0 && !selectedLabels.categories.includes(p.category)) return false;
      if (selectedLabels.brands?.length > 0 && !selectedLabels.brands.includes(p.brand)) return false;
      if (selectedLabels.types?.length > 0 && !selectedLabels.types.includes(p.type)) return false;
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
    <div className="container mx-auto px-4 py-5">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-3">
          <Filters onChange={setFilters} />
        </div>

        <div className="col-span-12 lg:col-span-9 border rounded-lg">
            
          <div className="flex items-center justify-between p-4 pb-0">
                     
            <div>
              <p className="font-medium">
                {total === 0 
                  ? "No items found" 
                  : `Showing ${startIndex + 1} - ${endIndex} of ${total} items`}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm text-neutral-500 italic">
              <Info size={18} strokeWidth={2} />
              <p>Photos may not represent actual items. Refer to name and product specs for all details</p>
            </div>
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
