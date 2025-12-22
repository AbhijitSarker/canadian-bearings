import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchLineIcon from "@/assets/icons/serachLine";
import { SlidersHorizontal, ChevronDown, Check, Layout, List } from "lucide-react";
import ProductCard from "@/components/ui/product-card";
import ProductListCard from "@/components/ui/product-list-card";
import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuItem 
} from "../ui/dropdown-menu";
import searchData from "@/data/search-data.json";

const SearchResults = ({ products, query = "", setQuery, sort, setSort, view = "grid", setView }) => {
    // Filter and sort products based on search query
    const sortedProducts = useMemo(() => {
        // If products are provided via prop, use them directly (assume already filtered/sorted/paginated)
        if (products) return products;

        // Fallback to local searchData logic
        // If no search query, show all products
        if (!query?.trim()) return searchData.products;
        
        // Filter products based on search query
        const searchQuery = query.toLowerCase().trim();
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
    }, [products, query, sort]);

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

                    <div className="flex items-center border border-neutral-200 rounded-lg bg-white p-1">
                        <button
                            onClick={() => setView('grid')}
                            className={`p-1.5 rounded-md transition-colors ${view === 'grid' ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}`}
                            title="Grid View"
                        >
                            <Layout size={18} />
                        </button>
                        <div className="w-[1px] h-4 bg-neutral-200 mx-1"></div>
                        <button
                            onClick={() => setView('list')}
                            className={`p-1.5 rounded-md transition-colors ${view === 'list' ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}`}
                            title="List View"
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <div className={`grid gap-6 p-4 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {sortedProducts.length === 0 ? (
                    <div className="col-span-full text-center py-8">
                        <p className="text-neutral-500">No products found matching your search criteria.</p>
                    </div>
                ) : sortedProducts.map((product) => {
                    // Fix protocol-relative URLs
                    const getAbsoluteUrl = (url) => {
                        if (!url) return "/placeholder.png";
                        if (url.startsWith("//")) return `https:${url}`;
                        return url;
                    };

                    const productData = {
                        ...product,
                        // Map API fields to ProductCard expected fields if needed
                        id: product.id || product.productId,
                        name: product.name || product.descriptionShort || product.cbSKU,
                        description: product.description || product.categoryName,
                        brand: product.brand || product.brandName,
                        itemNumber: product.itemNumber || product.mfgSKU,
                        image: getAbsoluteUrl(product.image || product.imageUrl || product.brandImageUrl || product.categoryImage),
                        price: product.price || 0
                    };

                    return (
                        <div key={product.id || product.productId}>
                            {view === 'grid' ? (
                                <ProductCard product={productData} />
                            ) : (
                                <ProductListCard product={productData} />
                            )}
                        </div>
                    );
                })}
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
