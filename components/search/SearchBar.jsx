"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchLineIcon from "@/assets/icons/serachLine";
import { useAuth } from "@/contexts/AuthContext";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    const handleSearch = (searchQuery) => {
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery) {
            router.push(`/products?search=${encodeURIComponent(trimmedQuery)}`);
            setQuery("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(query);
    };

    return (
        <div className="relative w-full z-50">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="border bg-white border-neutral-200 rounded-[30px] w-full flex items-center justify-between shadow-sm">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={isAuthenticated ? "Search products..." : "Please sign in to search"}
                        disabled={!isAuthenticated}
                        className={`flex-1 ml-5 text-sm md:text-base bg-transparent outline-none truncate min-w-0 pr-2 h-10 ${!isAuthenticated ? 'cursor-not-allowed text-neutral-400' : ''}`}
                    />
                    <button
                        type="submit"
                        className="bg-green-50 w-[32px] h-[32px] flex justify-center items-center rounded-full mr-[4px] my-[4px] hover:bg-green-100 transition-colors"
                        disabled={!isAuthenticated}
                    >
                        <SearchLineIcon />
                    </button>
                </div>
            </form>
        </div>
    );
}