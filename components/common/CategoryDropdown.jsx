"use client"
import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronRight, Loader2, X } from "lucide-react"
import { categoryService } from "@/lib/api/services/categories"
import { useRouter } from "next/navigation"

export default function CategoryDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const [columns, setColumns] = useState([]) // Array of column data: [{ items: [], loading: false, selectedId: null }]
    const [cache, setCache] = useState({}) // Cache: { categoryId: [subcategories] }
    
    const dropdownRef = useRef(null)
    const router = useRouter()

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
                setColumns([])
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Fetch Level 1 categories when drawer opens
    useEffect(() => {
        if (isOpen && columns.length === 0) {
            fetchLevel1()
        }
    }, [isOpen])

    const fetchLevel1 = async () => {
        setColumns([{ items: [], loading: true, selectedId: null }])
        try {
            const data = await categoryService.getSubCategories(null)
            if (data && data.subCategories) {
                setCache(prev => ({ ...prev, 'root': data.subCategories }))
                setColumns([{ items: data.subCategories, loading: false, selectedId: null }])
            }
        } catch (error) {
            console.error("Failed to fetch categories", error)
            setColumns([{ items: [], loading: false, selectedId: null }])
        }
    }

    const fetchSubCategories = async (categoryId) => {
        if (cache[categoryId]) {
            return cache[categoryId]
        }
        try {
            const data = await categoryService.getSubCategories(categoryId)
            if (data && data.subCategories) {
                // Store the subcategories array directly
                setCache(prev => ({ ...prev, [categoryId]: data.subCategories }))
                return data.subCategories
            }
            return []
        } catch (error) {
            console.error("Failed to fetch subcategories", error)
            return []
        }
    }

    const handleCloseColumn = (columnIndex) => {
        // Remove this column and all columns after it
        setColumns(columns.slice(0, columnIndex))
    }

    const hasSubcategories = (item) => {
        // Check if item has subcategories in cache or if productCount suggests there might be
        if (cache[item.id]) {
            return cache[item.id].length > 0
        }
        // Assume items might have subcategories if not yet fetched
        return true
    }

    const handleCategoryClick = async (category, columnIndex) => {
        // Update selected state for current column
        const updatedColumns = columns.slice(0, columnIndex + 1)
        updatedColumns[columnIndex] = {
            ...updatedColumns[columnIndex],
            selectedId: category.id
        }

        // Fetch subcategories
        const subcategories = await fetchSubCategories(category.id)

        if (subcategories && subcategories.length > 0) {
            // Add new column with subcategories
            updatedColumns.push({
                items: subcategories,
                loading: false,
                selectedId: null,
                parentName: category.name
            })
            setColumns(updatedColumns)
        } else {
            // Leaf node - navigate to category page
            setColumns(updatedColumns)
            setIsOpen(false)
            router.push(`/category/${category.id}`)
            setTimeout(() => setColumns([]), 300)
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
                        onClick={() => {
                            setIsOpen(false)
                            setColumns([])
                        }}
                    />
                    
                    {/* Drawer */}
                    <div className="fixed top-0 left-0 h-full bg-white shadow-2xl z-[70] flex flex-col animate-in slide-in-from-left duration-200"
                         style={{ width: `${Math.min(columns.length * 280, 1120)}px` }}>
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-[#324a50] text-white">
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
                                onClick={() => {
                                    setIsOpen(false)
                                    setColumns([])
                                }}
                                className="p-1 hover:bg-[#2a3e43] rounded-full transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Multi-Column Content */}
                        <div className="flex flex-1 overflow-hidden">
                            {columns.map((column, columnIndex) => (
                                <div 
                                    key={columnIndex}
                                    className={`w-[280px] flex-shrink-0 overflow-y-auto ${
                                        columnIndex === 0 ? 'bg-neutral-50' : 'bg-white'
                                    } ${columnIndex < columns.length - 1 ? 'border-r border-neutral-200' : ''}`}
                                >
                                    {/* Column Header */}
                                    <div className="sticky top-0 bg-neutral-100 px-3 py-2 border-b border-neutral-200 z-10 flex items-center justify-between">
                                        <h3 className="font-semibold text-sm text-[#324a50] truncate flex-1">
                                            {columnIndex === 0 ? 'All Categories' : column.parentName}
                                        </h3>
                                        {columnIndex > 0 && (
                                            <button
                                                onClick={() => handleCloseColumn(columnIndex)}
                                                className="p-1 hover:bg-neutral-200 rounded-full transition-colors flex-shrink-0"
                                                aria-label="Close column"
                                            >
                                                <X className="w-4 h-4 text-neutral-600" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Column Items */}
                                    {column.loading ? (
                                        <div className="flex justify-center items-center h-40">
                                            <Loader2 className="w-6 h-6 animate-spin text-green-600" />
                                        </div>
                                    ) : column.items.length > 0 ? (
                                        <div className="py-1">
                                            {column.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleCategoryClick(item, columnIndex)}
                                                    className={`px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                                                        column.selectedId === item.id
                                                            ? 'bg-green-50 text-[#324a50] font-semibold border-l-4 border-l-[#324a50]'
                                                            : 'text-neutral-700 hover:bg-green-50 hover:text-[#324a50]'
                                                    }`}
                                                >
                                                    <span className="text-sm truncate flex-1">{item.name}</span>
                                                    {hasSubcategories(item) && (
                                                        <ChevronRight className={`w-4 h-4 flex-shrink-0 ml-2 ${
                                                            column.selectedId === item.id ? 'text-[#324a50]' : 'text-neutral-400'
                                                        }`} />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-40 text-neutral-400 text-sm px-4 text-center">
                                            <p>No subcategories found</p>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Empty State (when no columns) */}
                            {columns.length === 0 && (
                                <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 text-sm p-6 text-center">
                                    <div className="bg-neutral-100 p-4 rounded-full mb-3">
                                        <svg className="w-8 h-8 text-neutral-300" viewBox="0 0 24 24" fill="currentColor">
                                            <rect x="3" y="3" width="7" height="7" rx="1" />
                                            <rect x="14" y="3" width="7" height="7" rx="1" />
                                            <rect x="3" y="14" width="7" height="7" rx="1" />
                                            <rect x="14" y="14" width="7" height="7" rx="1" />
                                        </svg>
                                    </div>
                                    <p className="font-medium text-neutral-600">Loading Categories...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
