"use client"

import { useMemo } from "react";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";

// Placeholder images - replace with your actual images
const headphoneImg = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop";
const macbookImg = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop";
const playstationImg = "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200&h=200&fit=crop";

// Dummy data
const suggestionsList = [
    "2 bolt flange bearing",
    "linear bearing",
    "needle roller bearing",
    "4 bolt flange bearing",
    "dodge pillow block bearing",
];

const categoriesList = [
    { id: 1, name: "2 bolt flange bearing", path: "Bearings > Mounted Bearings" },
    { id: 2, name: "2 bolt flange bearing", path: "Bearings > Mounted Bearings > Pillow Block Bearings" },
    { id: 3, name: "2 bolt flange bearing", path: "Bearings > Mounted Bearings > Flange Bearings" },
];

const brandsList = [
    { id: 1, name: "2 bolt flange bearing", brand: "Dodge" },
    { id: 2, name: "2 bolt flange bearing", brand: "SKF" },
];

const recommendedProducts = [
    {
        id: 1,
        category: "Ball Bearings",
        name: "SKF 6203 2ZJEM",
        description: "6203 2ZJEM | Single Row Cylindrical Bore Deep Groove Ball Bearing",
        itemNumber: "I01525229",
        price: 31.89,
        image: headphoneImg,
    },
    {
        id: 2,
        category: "Ball Bearings",
        name: "SKF 6203 2ZJEM",
        description: "6203 2ZJEM | Single Row Cylindrical Bore Deep Groove Ball Bearing",
        itemNumber: "I01525229",
        price: 31.89,
        image: macbookImg,
    },
    {
        id: 3,
        category: "Ball Bearings",
        name: "SKF 6203 2ZJEM",
        description: "6203 2ZJEM | Single Row Cylindrical Bore Deep Groove Ball Bearing",
        itemNumber: "I01525229",
        price: 31.89,
        image: playstationImg,
    },
    {
        id: 4,
        category: "Ball Bearings",
        name: "SKF 6203 2ZJEM",
        description: "6203 2ZJEM | Single Row Cylindrical Bore Deep Groove Ball Bearing",
        itemNumber: "I01525229",
        price: 31.89,
        image: headphoneImg,
    },
];

export default function SearchSuggestions({ query = "bearing", onSuggestionClick = () => { } }) {
    // Filter suggestions based on query
    const filteredSuggestions = useMemo(() => {
        return suggestionsList
            .filter((suggestion) =>
                suggestion.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 5);
    }, [query]);

    const filteredCategories = useMemo(() => {
        return categoriesList
            .filter((category) =>
                category.name.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 3);
    }, [query]);

    const filteredBrands = useMemo(() => {
        return brandsList
            .filter((brand) =>
                brand.name.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 2);
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

                    {/* Brands */}
                    {filteredBrands.length > 0 && (
                        <div className="py-3">
                            <h3 className="text-xs font-normal text-neutral-400 uppercase tracking-wide mb-2 px-4">
                                BRANDS
                            </h3>
                            <ul className="space-y-0">
                                {filteredBrands.map((brand) => (
                                    <li key={brand.id}>
                                        <button
                                            onClick={() => onSuggestionClick(brand.name)}
                                            className="w-full text-left px-4 py-2 hover:bg-neutral-50 transition-colors"
                                        >
                                            <div className="text-[15px]">
                                                {highlightMatch(brand.name, query)}
                                            </div>
                                            <div className="text-[13px] text-neutral-500 mt-0.5">
                                                in {brand.brand}
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
                        {recommendedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-xl border border-neutral-200 p-4 hover:border-green-500 hover:shadow-lg transition-all cursor-pointer group relative"
                                onClick={() => onSuggestionClick(query)}
                            >
                                {/* Favorite Icon */}
                                <button
                                    className="absolute top-4 right-4 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Handle favorite toggle
                                    }}
                                >
                                    <Heart size={18} className="text-neutral-400 hover:text-red-500 transition-colors" />
                                </button>

                                {/* Product Image */}
                                <div className="bg-neutral-50 rounded-lg mb-4 h-36 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain p-3"
                                    />
                                </div>

                                {/* Category */}
                                <p className="text-xs text-neutral-600 mb-2">{product.category}</p>

                                {/* Product Name */}
                                <h4 className="text-base font-medium text-neutral-950 mb-2 line-clamp-1">
                                    {product.name}
                                </h4>

                                {/* Description */}
                                <p className="text-xs text-neutral-600 mb-3 line-clamp-2 leading-relaxed">
                                    {product.description}
                                </p>

                                {/* Item Number */}
                                <p className="text-xs text-neutral-500 mb-4">
                                    Item #{product.itemNumber}
                                </p>

                                {/* Price and Add to Cart */}
                                <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                                    <div className="flex items-baseline gap-0.5">
                                        <span className="text-lg font-semibold text-neutral-950">
                                            ${product.price}
                                        </span>
                                        <span className="text-xs text-neutral-600">/each</span>
                                    </div>
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-1.5"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Handle add to cart
                                        }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 2L7 6H3L6 12L3 18H7L9 22H15L17 18H21L18 12L21 6H17L15 2H9Z" />
                                            <circle cx="9" cy="21" r="1" />
                                            <circle cx="20" cy="21" r="1" />
                                        </svg>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}