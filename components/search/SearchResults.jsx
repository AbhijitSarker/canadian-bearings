"use client"

import React, { useRef, useEffect } from "react";
import ProductCard from "../ui/product-card";
import SearchLineIcon from "@/assets/icons/serachLine";
import { SlidersHorizontal, ChevronDown, Check, Layout, List } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "../ui/dropdown-menu";

const SearchResults = ({ products = [], query, setQuery, sort, setSort, view = "grid", setView }) => {
    // products here are already filtered/paginated by parent
    const results = products || [];

    return (
        <div>
            <div className="flex items-center justify-between p-4 gap-4 border-b">

                    <div className="relative flex-1">
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
                        <div className="text-[12px] text-neutral-500 bg-white border border-neutral-200 rounded-lg px-2 py-1">⌘1</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">

                    <div className="relative">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                >
                                    <span className="text-neutral-400">
                                        <SlidersHorizontal size={18} />
                                    </span>

                                    <span className="text-sm text-neutral-700 font-medium">Sort by</span>

                                    <span className="ml-2 text-neutral-400">
                                        <ChevronDown size={14} />
                                    </span>
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent sideOffset={6}>
                                <DropdownMenuItem onClick={() => setSort('relevance')}>
                                    <span className="text-neutral-700">Relevance</span>
                                    {sort === 'relevance' ? <Check size={16} className="text-green-600 ml-2" /> : null}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSort('price-asc')}>
                                    <span className="text-neutral-700">Price: Low to High</span>
                                    {sort === 'price-asc' ? <Check size={16} className="text-green-600 ml-2" /> : null}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSort('price-desc')}>
                                    <span className="text-neutral-700">Price: High to Low</span>
                                    {sort === 'price-desc' ? <Check size={16} className="text-green-600 ml-2" /> : null}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {results.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
