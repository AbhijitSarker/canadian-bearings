"use client"

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import searchData from "@/data/search-data.json";
import ProductCard from "@/components/ui/product-card";

export default function SearchSuggestions({ query = "", onSuggestionClick = () => { } }) {
    // Filter suggestions based on query
    const filteredSuggestions = useMemo(() => {
        if (!query) return [];
        return searchData.suggestions
            .filter((suggestion) =>
                suggestion.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 5);
    }, [query]);

    const filteredCategories = useMemo(() => {
        if (!query) return [];
        return searchData.categories
            .filter((category) =>
                category.name.toLowerCase().includes(query.toLowerCase()) ||
                category.path.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 3);
    }, [query]);

    const filteredProducts = useMemo(() => {
        if (!query) return [];
        return searchData.products
            .filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase()) ||
                product.brand.toLowerCase().includes(query.toLowerCase()) ||
                product.itemNumber.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 4);
    }, [query]);

    // Highlight matching text
    const highlightMatch = (text, query) => {
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === query.toLowerCase() ?
                        <strong key={i} className="font-semibold text-neutral-950">{part}</strong> :
                        <span key={i} className="text-neutral-600">{part}</span>
                )}
            </span>
        );
    };

    return (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-2xl shadow-2xl z-50 overflow-hidden max-w-full max-h-[600px]">
            <div className="grid grid-cols-12 h-full">
                {/* Left Column - Suggestions */}
                <div className="col-span-4 border-r border-neutral-200 py-4 overflow-y-auto max-h-[600px]">
                    {/* Search Suggestions */}
                    {filteredSuggestions.length > 0 && (
                        <div className="border-b border-neutral-200 pb-3">
                            <h3 className="text-xs font-normal text-neutral-400 uppercase tracking-wide mb-2 px-4">
                                SUGGESTIONS
                            </h3>
                            <ul className="space-y-0">
                                {filteredSuggestions.map((suggestion, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => onSuggestionClick(suggestion)}
                                            className="w-full text-left px-4 py-2 text-[15px] hover:bg-neutral-50 transition-colors"
                                        >
                                            {highlightMatch(suggestion, query)}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Product Categories */}
                    {filteredCategories.length > 0 && (
                        <div className="border-b border-neutral-200 py-3">
                            <h3 className="text-xs font-normal text-neutral-400 uppercase tracking-wide mb-2 px-4">
                                PRODUCT CATEGORIES
                            </h3>
                            <ul className="space-y-0">
                                {filteredCategories.map((category) => (
                                    <li key={category.id}>
                                        <button
                                            onClick={() => onSuggestionClick(category.name)}
                                            className="w-full text-left px-4 py-2 hover:bg-neutral-50 transition-colors"
                                        >
                                            <div className="text-[15px]">
                                                {highlightMatch(category.name, query)}
                                            </div>
                                            <div className="text-[13px] text-neutral-500 mt-0.5">
                                                in {category.path}
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Products */}
                    {filteredProducts.length > 0 && (
                        <div className="py-3">
                            <h3 className="text-xs font-normal text-neutral-400 uppercase tracking-wide mb-2 px-4">
                                PRODUCTS
                            </h3>
                            <ul className="space-y-0">
                                {filteredProducts.map((product) => (
                                    <li key={product.id}>
                                        <button
                                            onClick={() => onSuggestionClick(product.name)}
                                            className="w-full text-left px-4 py-2 hover:bg-neutral-50 transition-colors"
                                        >
                                            <div className="text-[15px]">
                                                {highlightMatch(product.name, query)}
                                            </div>
                                            <div className="text-[13px] text-neutral-500 mt-0.5">
                                                in {product.category}
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Right Column - Recommended Products */}
                <div className="col-span-8 p-6 overflow-y-auto max-h-[600px]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[15px] font-normal text-neutral-950">
                            Recommended Products for "<span className="font-semibold">{query}</span>"
                        </h3>
                        <button
                            onClick={() => onSuggestionClick(query)}
                            className="flex items-center gap-1.5 text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                        >
                            See all product
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {filteredProducts.map((product) => (
                            <div key={product.id} onClick={() => onSuggestionClick(product.name)}>
                                <ProductCard 
                                    product={{
                                        ...product,
                                        image: `/assets/categories/${product.categoryImage || 'category1.png'}`
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}