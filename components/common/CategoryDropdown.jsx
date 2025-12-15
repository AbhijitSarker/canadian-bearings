"use client"
import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { categoryService } from "@/lib/api/services/categories"

export default function CategoryDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [activeCategory, setActiveCategory] = useState(null)
    const [subCategories, setSubCategories] = useState({}) // Cache: { categoryId: [subcats] }
    const [loadingSub, setLoadingSub] = useState(false)
    
    const dropdownRef = useRef(null)

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
                setActiveCategory(null)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Fetch Level 1 categories on first open
    useEffect(() => {
        if (isOpen && categories.length === 0) {
            fetchCategories()
        }
    }, [isOpen])

    const fetchCategories = async () => {
        setLoading(true)
        try {
            const data = await categoryService.getSubCategories(null)
            if (data && data.subCategories) {
                setCategories(data.subCategories)
            }
        } catch (error) {
            console.error("Failed to fetch categories", error)
        } finally {
            setLoading(false)
        }
    }

    const handleCategoryClick = async (category) => {
        setActiveCategory(category)
        
        // If already cached, don't fetch
        if (subCategories[category.id]) return

        setLoadingSub(true)
        try {
            const data = await categoryService.getSubCategories(category.id)
            if (data && data.subCategories) {
                setSubCategories(prev => ({
                    ...prev,
                    [category.id]: data.subCategories
                }))
            }
        } catch (error) {
            console.error("Failed to fetch subcategories", error)
        } finally {
            setLoadingSub(false)
        }
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-[#324a50] hover:bg-[#2a3e43] text-white px-3 py-2 rounded-md text-sm transition-colors flex-shrink-0"
                aria-label="All Products"
            >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
                <span className="whitespace-nowrap font-medium">All Product</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-xl z-50 flex min-h-[400px]">
                    {/* Level 1 Categories */}
                    <div className="w-[280px] py-2 border-r border-neutral-100 overflow-y-auto max-h-[600px]">
                        {loading ? (
                            <div className="flex justify-center items-center h-40">
                                <Loader2 className="w-6 h-6 animate-spin text-green-600" />
                            </div>
                        ) : (
                            categories.map((category) => (
                                <div
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category)}
                                    className={`px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-green-50 transition-colors ${
                                        activeCategory?.id === category.id ? 'bg-green-50 text-green-700 font-medium' : 'text-neutral-700'
                                    }`}
                                >
                                    <span className="text-sm truncate">{category.name}</span>
                                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                                </div>
                            ))
                        )}
                    </div>

                    {/* Level 2 Subcategories (Flyout) */}
                    <div className="w-[300px] bg-neutral-50 py-4 px-4 overflow-y-auto max-h-[600px]">
                        {activeCategory ? (
                            <>
                                <h3 className="font-semibold text-neutral-900 mb-4 pb-2 border-b border-neutral-200">
                                    {activeCategory.name}
                                </h3>
                                {loadingSub && !subCategories[activeCategory.id] ? (
                                    <div className="flex justify-center items-center h-40">
                                        <Loader2 className="w-6 h-6 animate-spin text-green-600" />
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        {subCategories[activeCategory.id]?.map((sub) => (
                                            <Link
                                                key={sub.id}
                                                href={`/category/${sub.id}`} // Placeholder link
                                                className="block px-3 py-2 text-sm text-neutral-600 hover:text-green-700 hover:bg-white rounded-md transition-colors"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                        {(!subCategories[activeCategory.id] || subCategories[activeCategory.id].length === 0) && (
                                            <p className="text-sm text-neutral-400 italic px-3">No subcategories found</p>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-neutral-400 text-sm">
                                <p>Click on a category</p>
                                <p>to see subcategories</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
