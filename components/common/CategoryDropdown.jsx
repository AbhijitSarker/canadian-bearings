"use client"
import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronRight, ChevronLeft, Loader2, X } from "lucide-react"
import { categoryService } from "@/lib/api/services/categories"
import { useRouter } from "next/navigation"

export default function CategoryDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const [columns, setColumns] = useState([]) // Array of column data: [{ items: [], loading: false, selectedId: null }]
    const [cache, setCache] = useState({}) // Cache: { categoryId: [subcategories] }
    const [mobileActiveLevel, setMobileActiveLevel] = useState(0) // For mobile: which level is currently visible
    
    const dropdownRef = useRef(null)
    const router = useRouter()

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
                setColumns([])
                setMobileActiveLevel(0)
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
        setColumns([{ items: [], loading: true, selectedId: null, parentId: null }])
        try {
            const data = await categoryService.getSubCategories(null)
            if (data && data.subCategories) {
                setCache(prev => ({ ...prev, 'root': data.subCategories }))
                setColumns([{ items: data.subCategories, loading: false, selectedId: null, parentId: null }])
            }
        } catch (error) {
            console.error("Failed to fetch categories", error)
            setColumns([{ items: [], loading: false, selectedId: null, parentId: null }])
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
        // Update mobile active level
        if (mobileActiveLevel >= columnIndex) {
            setMobileActiveLevel(Math.max(0, columnIndex - 1))
        }
    }

    const hasSubcategories = (item) => {
        // Check childCount from API response
        if (item.childCount !== undefined) {
            return item.childCount > 0
        }
        // Fallback: check cache
        if (cache[item.id]) {
            return cache[item.id].length > 0
        }
        // Default to true if not yet fetched
        return true
    }

    const handleCategoryClick = async (category, columnIndex) => {
        // Update selected state for current column
        const updatedColumns = columns.slice(0, columnIndex + 1)
        updatedColumns[columnIndex] = {
            ...updatedColumns[columnIndex],
            selectedId: category.id
        }

        // Immediately add new column with loading state
        updatedColumns.push({
            items: [],
            loading: true,
            selectedId: null,
            parentName: category.name,
            parentId: category.id
        })
        setColumns(updatedColumns)
        
        // On mobile, move to next level after a brief delay to allow DOM to render
        setTimeout(() => {
            setMobileActiveLevel(columnIndex + 1)
        }, 50)

        // Fetch subcategories asynchronously
        const subcategories = await fetchSubCategories(category.id)

        if (subcategories && subcategories.length > 0) {
            // Update the loading column with actual data
            const finalColumns = [...updatedColumns]
            finalColumns[finalColumns.length - 1] = {
                items: subcategories,
                loading: false,
                selectedId: null,
                parentName: category.name,
                parentId: category.id
            }
            setColumns(finalColumns)
        } else {
            // Leaf node - remove loading column and navigate
            setColumns(updatedColumns.slice(0, -1))
            setIsOpen(false)
            router.push(`/products?categories=${category.id}`)
            setTimeout(() => {
                setColumns([])
                setMobileActiveLevel(0)
            }, 300)
        }
    }

    const handleHeaderClick = (column, columnIndex) => {
        setIsOpen(false)
        if (columnIndex === 0) {
            router.push('/products')
        } else if (column.parentId) {
            router.push(`/products?categories=${column.parentId}`)
        }
        
        // Reset state after navigation
        setTimeout(() => {
            setColumns([])
            setMobileActiveLevel(0)
        }, 300)
    }

    const handleMobileBack = () => {
        setMobileActiveLevel(Math.max(0, mobileActiveLevel - 1))
    }

    const CategorySkeleton = () => (
        <div className="py-2 px-4 space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center justify-between">
                    <div className="h-4 bg-neutral-200 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-neutral-200 rounded w-4 animate-pulse" />
                </div>
            ))}
        </div>
    )

    return (
        <div className="" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 md:gap-2 bg-white hover:bg-green-50 border text-neutral-700 px-2 md:px-4 h-9 md:h-10 rounded-full text-xs md:text-sm transition-colors flex-shrink-0"
                aria-label="All Products"
            >
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
                <span className="whitespace-nowrap font-medium hidden sm:inline">All Product</span>
                <span className="whitespace-nowrap font-medium sm:hidden">Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/50 z-[60]"
                        onClick={() => {
                            setIsOpen(false)
                            setColumns([])
                            setMobileActiveLevel(0)
                        }}
                    />
                    
                    {/* Drawer */}
                    <div className="fixed top-0 left-0 h-full bg-white shadow-2xl z-[70] flex flex-col animate-in slide-in-from-left duration-200"
                         style={{ 
                             width: typeof window !== 'undefined' && window.innerWidth < 640 
                                 ? '85vw' 
                                 : typeof window !== 'undefined' && window.innerWidth < 1024
                                     ? `${Math.min(columns.length * 280, 600)}px`
                                     : `${Math.min(columns.length * 280, 1120)}px`,
                             maxWidth: typeof window !== 'undefined' && window.innerWidth < 640 
                                 ? '85vw' 
                                 : '1120px'
                         }}>
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
                                onClick={() => {
                                    setIsOpen(false)
                                    setColumns([])
                                    setMobileActiveLevel(0)
                                }}
                                className="p-1 hover:bg-green-600 rounded-full transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Multi-Column Content - Desktop/Tablet */}
                        <div className="hidden lg:flex flex-1 overflow-hidden">
                            {columns.map((column, columnIndex) => (
                                <div 
                                    key={columnIndex}
                                    className={`w-[280px] flex-shrink-0 overflow-y-auto ${
                                        columnIndex === 0 ? 'bg-neutral-50' : 'bg-white'
                                    } ${columnIndex < columns.length - 1 ? 'border-r border-neutral-200' : ''}`}
                                >
                                    {/* Column Header */}
                                    <div className="sticky top-0 bg-neutral-100 px-3 py-2 border-b border-neutral-200 z-10 flex items-center justify-between">
                                        <h3 
                                            onClick={() => handleHeaderClick(column, columnIndex)}
                                            className="font-semibold text-sm text-[#324a50] underline truncate flex-1 cursor-pointer hover:text-green-600 transition-colors"
                                            title="View all products in this category"
                                        >
                                            {columnIndex === 0 ? 'All Categories' : column.parentName}
                                        </h3>
                                        {columnIndex > 0 && (
                                            <button
                                                onClick={() => handleCloseColumn(columnIndex)}
                                                className="p-1 hover:bg-neutral-200 rounded-full transition-colors flex-shrink-0"
                                                aria-label="Close column"
                                            >
                                                <X className="w-3 h-3 text-neutral-600" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Column Items */}
                                    {column.loading ? (
                                        <CategorySkeleton />
                                    ) : column.items.length > 0 ? (
                                        <div className="py-1">
                                            {column.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleCategoryClick(item, columnIndex)}
                                                    className={`px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                                                        column.selectedId === item.id
                                                            ? 'bg-green-50 text-[#324a50] font-semibold border-l-4 border-l-green-500'
                                                            : 'text-neutral-700 hover:bg-green-50 hover:text-[#324a50]'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                                        <span className="text-sm truncate">{item.name}</span>
                                                        {item.productCount !== undefined && (
                                                            <span className="text-xs text-neutral-400 flex-shrink-0">
                                                                ({item.productCount})
                                                            </span>
                                                        )}
                                                    </div>
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

                        {/* Mobile/Tablet Stacked View */}
                        <div className="lg:hidden flex-1 overflow-hidden relative">
                            {columns.map((column, columnIndex) => (
                                <div
                                    key={columnIndex}
                                    className={`absolute inset-0 bg-white transition-transform duration-300 ${
                                        columnIndex === mobileActiveLevel 
                                            ? 'translate-x-0' 
                                            : columnIndex < mobileActiveLevel 
                                                ? '-translate-x-full' 
                                                : 'translate-x-full'
                                    }`}
                                >
                                    {/* Mobile Column Header */}
                                    <div className="sticky top-0 bg-neutral-100 px-3 py-3 border-b border-neutral-200 z-10 flex items-center gap-3">
                                        {columnIndex > 0 && (
                                            <button
                                                onClick={handleMobileBack}
                                                className="p-1 hover:bg-neutral-200 rounded-full transition-colors flex-shrink-0"
                                                aria-label="Go back"
                                            >
                                                <ChevronLeft className="w-5 h-5 text-neutral-600" />
                                            </button>
                                        )}
                                        <h3 
                                            onClick={() => handleHeaderClick(column, columnIndex)}
                                            className="font-semibold text-sm text-[#324a50] truncate flex-1 cursor-pointer hover:text-green-600 transition-colors"
                                        >
                                            {columnIndex === 0 ? 'All Categories' : column.parentName}
                                        </h3>
                                    </div>

                                    {/* Mobile Column Items */}
                                    <div className="overflow-y-auto h-full pb-20">
                                        {column.loading ? (
                                            <CategorySkeleton />
                                        ) : column.items.length > 0 ? (
                                            <div className="py-1">
                                                {column.items.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        onClick={() => handleCategoryClick(item, columnIndex)}
                                                        className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-colors border-b border-neutral-100 ${
                                                            column.selectedId === item.id
                                                                ? 'bg-green-50 text-[#324a50] font-semibold'
                                                                : 'text-neutral-700 active:bg-green-50'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                                            <span className="text-sm truncate">{item.name}</span>
                                                            {item.productCount !== undefined && (
                                                                <span className="text-xs text-neutral-400 flex-shrink-0">
                                                                    ({item.productCount})
                                                                </span>
                                                            )}
                                                        </div>
                                                        {hasSubcategories(item) && (
                                                            <ChevronRight className="w-5 h-5 flex-shrink-0 ml-2 text-neutral-400" />
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
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
