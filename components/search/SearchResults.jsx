import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchLineIcon from "@/assets/icons/serachLine";
import { SlidersHorizontal, ChevronDown, Check, Layout, List } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "../ui/dropdown-menu";
import searchData from "@/data/search-data.json";

const SearchResults = ({ query = "", setQuery, sort, setSort, view = "grid", setView }) => {
    // Filter and sort products based on search query
    const sortedProducts = useMemo(() => {
        const searchQuery = query.toLowerCase().trim();
        
        // If no search query, show empty results
        if (!searchQuery) return [];
        
        // Filter products
        const results = searchData.products.filter(product => {
            const searchFields = [
                product.name,
                product.description,
                product.category,
                product.brand,
                product.itemNumber
            ].map(field => (field || "").toLowerCase());

            return searchFields.some(field => field.includes(searchQuery));
        });

        // Apply sorting
        return [...results].sort((a, b) => {
            switch (sort) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                default:
                    // For relevance, prioritize matches in name and item number
                    const aNameMatch = a.name.toLowerCase().includes(searchQuery);
                    const bNameMatch = b.name.toLowerCase().includes(searchQuery);
                    if (aNameMatch !== bNameMatch) return bNameMatch - aNameMatch;
                    return a.name.localeCompare(b.name);
            }
        });
    }, [query, sort]);

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

            <div className={`grid gap-6 p-4 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {sortedProducts.length === 0 ? (
                    <div className="col-span-full text-center py-8">
                        <p className="text-neutral-500">No products found matching your search criteria.</p>
                    </div>
                ) : sortedProducts.map((product) => (
                    <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="group rounded-lg border border-neutral-200 bg-white p-4 transition-shadow hover:shadow-lg"
                    >
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-50">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="mt-4">
                            <h3 className="font-medium text-neutral-900">{product.name}</h3>
                            <p className="mt-1 text-sm text-neutral-500">{product.description}</p>
                            <p className="mt-1 text-sm text-neutral-400">Item #{product.itemNumber}</p>
                            <div className="mt-2 flex items-center justify-between">
                                <span className="text-lg font-medium text-neutral-900">
                                    ${product.price}
                                </span>
                                <span className="text-sm text-neutral-500">{product.brand}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {sortedProducts.length > 0 && (
                <div className="border-t p-4">
                    <p className="text-sm text-neutral-500">
                        Found {sortedProducts.length} products matching your search
                    </p>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
