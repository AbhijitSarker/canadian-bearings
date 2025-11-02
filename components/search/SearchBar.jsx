"use client"

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchLineIcon from "@/assets/icons/serachLine";
import SearchSuggestions from "./SearchSuggestions";
import { useAuth } from "@/contexts/AuthContext";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        const handleScroll = () => {
            if (showSuggestions) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [showSuggestions]);

    const handleSearch = (searchQuery) => {
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery) {
            router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
            setShowSuggestions(false);
            setQuery("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(query);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setShowSuggestions(value.length > 0);
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        handleSearch(suggestion);
    };

    return (
        <>
            {showSuggestions && (
                <div 
                    className="fixed inset-0 bg-black/40 z-40" 
                    onClick={() => setShowSuggestions(false)}
                />
            )}
            <div className="relative w-full z-50" ref={searchRef}>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="border bg-white border-neutral-200 rounded-[30px] w-full flex items-center justify-between shadow-sm">
                        <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={() => isAuthenticated && query.length > 0 && setShowSuggestions(true)}
                        placeholder={isAuthenticated ? "Search products..." : "Please sign in to search"}
                        disabled={!isAuthenticated}
                        className={`flex-1 ml-5 text-sm md:text-base bg-transparent outline-none truncate min-w-0 pr-2 h-11 md:h-[44px] ${!isAuthenticated ? 'cursor-not-allowed text-neutral-400' : ''}`}
                    />
                    <button
                        type="submit"
                        className="bg-green-50 w-[32px] h-[32px] flex justify-center items-center rounded-full mr-[4px] my-[4px] hover:bg-green-100 transition-colors"
                    >
                        <SearchLineIcon />
                    </button>
                </div>
            </form>

            {showSuggestions && query && (
                <SearchSuggestions
                    query={query}
                    onSuggestionClick={handleSuggestionClick}
                    onClose={() => setShowSuggestions(false)}
                />
            )}
        </div>
        </>
    );
}