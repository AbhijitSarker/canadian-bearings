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
        <div className="" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-[#324a50] hover:bg-[#2a3e43] text-white px-4 h-10 rounded-full text-sm transition-colors flex-shrink-0"
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
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/50 z-[60]"
                        onClick={() => setIsOpen(false)}
                    />
                    
                    {/* Drawer */}
                    <div className="fixed top-0 left-0 h-full w-[600px] bg-white shadow-2xl z-[70] flex flex-col animate-in slide-in-from-left duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-green-500 text-white">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                    <rect x="3" y="3" width="7" height="7" rx="1" />
                                    <rect x="14" y="3" width="7" height="7" rx="1" />
                                    <rect x="3" y="14" width="7" height="7" rx="1" />
                                    <rect x="14" y="14" width="7" height="7" rx="1" />
                                </svg>
                                <span className="font-semibold text-lg">Categories</span>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-[#2a3e43] rounded-full transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 overflow-hidden">
                            {/* Level 1 Categories */}
                            <div className="w-1/2 border-r border-neutral-200 overflow-y-auto bg-green-50">
                                {loading ? (
                                    <div className="flex justify-center items-center h-40">
                                        <Loader2 className="w-6 h-6 animate-spin text-green-600" />
                                    </div>
                                ) : (
                                    categories.map((category) => (
                                        <div
                                            key={category.id}
                                            onClick={() => handleCategoryClick(category)}
                                            className={`px-4 py-3 flex items-center justify-between cursor-pointer border-b border-neutral-100 transition-colors ${
                                                activeCategory?.id === category.id 
                                                    ? 'bg-white text-green-700 font-semibold border-l-4 border-l-green-500' 
                                                    : 'text-neutral-700 hover:bg-white hover:text-green-700'
                                            }`}
                                        >
                                            <span className="text-sm">{category.name}</span>
                                            <ChevronRight className={`w-4 h-4 ${activeCategory?.id === category.id ? 'text-[#324a50]' : 'text-neutral-400'}`} />
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Level 2 Subcategories */}
                            <div className="w-1/2 bg-white overflow-y-auto">
                                {activeCategory ? (
                                    <div className="p-4">
                                        <h3 className="font-bold text-[#324a50] text-lg mb-4 pb-2 border-b border-neutral-100">
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
                                                        href={`/category/${sub.id}`}
                                                        className="block px-3 py-2 text-sm text-neutral-600 hover:text-[#324a50] hover:bg-green-50 rounded-md transition-colors"
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
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-neutral-400 text-sm p-6 text-center">
                                        <div className="bg-neutral-100 p-4 rounded-full mb-3">
                                            <svg className="w-8 h-8 text-neutral-300" viewBox="0 0 24 24" fill="currentColor">
                                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                                <rect x="3" y="14" width="7" height="7" rx="1" />
                                                <rect x="14" y="14" width="7" height="7" rx="1" />
                                            </svg>
                                        </div>
                                        <p className="font-medium text-neutral-600">Select a Category</p>
                                        <p className="mt-1">Click on a category from the left to view its subcategories</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
