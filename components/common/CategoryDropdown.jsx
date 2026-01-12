"use client"
import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronRight, ChevronLeft, Loader2, X, Grid3x3, ArrowRight, Package } from "lucide-react"
import { categoryService } from "@/lib/api/services/categories"
import { useRouter } from "next/navigation"

export default function CategoryDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const [columns, setColumns] = useState([])
    const [cache, setCache] = useState({})
    const [mobileActiveLevel, setMobileActiveLevel] = useState(0)

    const dropdownRef = useRef(null)
    const router = useRouter()

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
        setColumns(columns.slice(0, columnIndex))
        if (mobileActiveLevel >= columnIndex) {
            setMobileActiveLevel(Math.max(0, columnIndex - 1))
        }
    }

    const hasSubcategories = (item) => {
        if (item.childCount !== undefined) {
            return item.childCount > 0
        }
        if (cache[item.id]) {
            return cache[item.id].length > 0
        }
        return true
    }

    const handleCategoryClick = async (category, columnIndex) => {
        const updatedColumns = columns.slice(0, columnIndex + 1)
        updatedColumns[columnIndex] = {
            ...updatedColumns[columnIndex],
            selectedId: category.id
        }

        updatedColumns.push({
            items: [],
            loading: true,
            selectedId: null,
            parentName: category.name,
            parentId: category.id
        })
        setColumns(updatedColumns)

        setTimeout(() => {
            setMobileActiveLevel(columnIndex + 1)
        }, 50)

        const subcategories = await fetchSubCategories(category.id)

        if (subcategories && subcategories.length > 0) {
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

        setTimeout(() => {
            setColumns([])
            setMobileActiveLevel(0)
        }, 300)
    }

    const handleMobileBack = () => {
        setMobileActiveLevel(Math.max(0, mobileActiveLevel - 1))
    }

    const CategorySkeleton = () => (
        <div className="py-3 px-4 space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center justify-between animate-pulse">
                    <div className="flex items-center gap-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                        <div className="h-3 bg-gray-100 rounded w-8" />
                    </div>
                    <div className="h-4 w-4 bg-gray-200 rounded" />
                </div>
            ))}
        </div>
    )

    return (
        <div className="" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 md:gap-2 bg-white hover:bg-green-50 border border-neutral-200 text-neutral-700 px-2 md:px-4 h-9 md:h-10 rounded-full text-xs md:text-sm transition-all hover:border-green-300 hover:shadow-sm flex-shrink-0 group"
                aria-label="All Products"
            >
                <Grid3x3 className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600" />
                <span className="whitespace-nowrap font-medium hidden sm:inline">All Products</span>
                <span className="whitespace-nowrap font-medium sm:hidden">Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:text-green-600 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-all duration-300"
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
                        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                    <Grid3x3 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-md">Browse Categories</h2>
                                    <p className="text-xs text-green-100">Find what you need</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setIsOpen(false)
                                    setColumns([])
                                    setMobileActiveLevel(0)
                                }}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Multi-Column Content - Desktop/Tablet */}
                        <div className="hidden lg:flex flex-1 overflow-hidden bg-gray-50">
                            {columns.map((column, columnIndex) => (
                                <div
                                    key={columnIndex}
                                    className={`w-[280px] flex-shrink-0 overflow-y-auto bg-white ${columnIndex < columns.length - 1 ? 'border-r border-gray-200' : ''
                                        }`}
                                >
                                    {/* Column Header */}
                                    <div className="sticky top-0 bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200 z-10 flex items-center justify-between shadow-sm">
                                        <button
                                            onClick={() => handleHeaderClick(column, columnIndex)}
                                            className="font-semibold text-sm text-gray-800 truncate flex-1 text-left hover:text-green-600 transition-colors flex items-center gap-2 group"
                                            title="View all products in this category"
                                        >
                                            {columnIndex === 0 ? (
                                                <>
                                                    <Package className="w-4 h-4 text-green-600" />
                                                    All Categories
                                                </>
                                            ) : (
                                                <>
                                                    <span className="truncate">{column.parentName}</span>
                                                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                                </>
                                            )}
                                        </button>
                                        {columnIndex > 0 && (
                                            <button
                                                onClick={() => handleCloseColumn(columnIndex)}
                                                className="p-1.5 hover:bg-gray-200 rounded-md transition-colors flex-shrink-0 ml-2"
                                                aria-label="Close column"
                                            >
                                                <X className="w-3.5 h-3.5 text-gray-500" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Column Items */}
                                    {column.loading ? (
                                        <CategorySkeleton />
                                    ) : column.items.length > 0 ? (
                                        <div className="py-2">
                                            {column.items.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => handleCategoryClick(item, columnIndex)}
                                                    className={`w-full px-4 py-3 flex items-center justify-between cursor-pointer transition-all ${column.selectedId === item.id
                                                            ? 'bg-green-50 text-green-900 font-semibold border-l-4 border-l-green-600 shadow-sm'
                                                            : 'text-gray-700 hover:bg-green-50/50 hover:text-green-800 border-l-4 border-l-transparent'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                                        <span className="text-sm truncate">{item.name}</span>
                                                        {item.productCount !== undefined && (
                                                            <span className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ${column.selectedId === item.id
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : 'bg-gray-100 text-gray-500'
                                                                }`}>
                                                                {item.productCount}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {hasSubcategories(item) && (
                                                        <ChevronRight className={`w-4 h-4 flex-shrink-0 ml-2 transition-colors ${column.selectedId === item.id ? 'text-green-700' : 'text-gray-400'
                                                            }`} />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-sm px-4 text-center">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                                <Package className="w-8 h-8 text-gray-300" />
                                            </div>
                                            <p className="font-medium text-gray-600">No subcategories</p>
                                            <p className="text-xs mt-1">This is a final category</p>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Empty State */}
                            {columns.length === 0 && (
                                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                                    <div className="relative mb-6">
                                        <div className="w-20 h-20 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                                        <Grid3x3 className="absolute inset-0 m-auto w-8 h-8 text-green-600" />
                                    </div>
                                    <p className="font-semibold text-gray-700 text-lg">Loading Categories...</p>
                                    <p className="text-sm text-gray-500 mt-2">Please wait a moment</p>
                                </div>
                            )}
                        </div>

                        {/* Mobile/Tablet Stacked View */}
                        <div className="lg:hidden flex-1 overflow-hidden relative bg-white">
                            {columns.map((column, columnIndex) => (
                                <div
                                    key={columnIndex}
                                    className={`absolute inset-0 bg-white transition-transform duration-300 ${columnIndex === mobileActiveLevel
                                            ? 'translate-x-0'
                                            : columnIndex < mobileActiveLevel
                                                ? '-translate-x-full'
                                                : 'translate-x-full'
                                        }`}
                                >
                                    {/* Mobile Column Header */}
                                    <div className="sticky top-0 bg-gradient-to-b from-gray-50 to-white px-4 py-3 border-b border-gray-200 z-10 flex items-center gap-3 shadow-sm">
                                        {columnIndex > 0 && (
                                            <button
                                                onClick={handleMobileBack}
                                                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                                                aria-label="Go back"
                                            >
                                                <ChevronLeft className="w-5 h-5 text-gray-600" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleHeaderClick(column, columnIndex)}
                                            className="font-semibold text-base text-gray-800 truncate flex-1 text-left hover:text-green-600 transition-colors"
                                        >
                                            {columnIndex === 0 ? 'All Categories' : column.parentName}
                                        </button>
                                    </div>

                                    {/* Mobile Column Items */}
                                    <div className="overflow-y-auto h-full pb-20">
                                        {column.loading ? (
                                            <CategorySkeleton />
                                        ) : column.items.length > 0 ? (
                                            <div className="py-2">
                                                {column.items.map((item) => (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => handleCategoryClick(item, columnIndex)}
                                                        className={`w-full px-4 py-4 flex items-center justify-between cursor-pointer transition-all border-b border-gray-100 ${column.selectedId === item.id
                                                                ? 'bg-green-50 text-green-900 font-semibold'
                                                                : 'text-gray-700 active:bg-green-50'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                                            <span className="text-sm truncate">{item.name}</span>
                                                            {item.productCount !== undefined && (
                                                                <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${column.selectedId === item.id
                                                                        ? 'bg-green-100 text-green-700'
                                                                        : 'bg-gray-100 text-gray-500'
                                                                    }`}>
                                                                    {item.productCount}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {hasSubcategories(item) && (
                                                            <ChevronRight className="w-5 h-5 flex-shrink-0 ml-2 text-gray-400" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-64 text-gray-400 text-sm px-4 text-center">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                                    <Package className="w-8 h-8 text-gray-300" />
                                                </div>
                                                <p className="font-medium text-gray-600">No subcategories</p>
                                                <p className="text-xs mt-1">This is a final category</p>
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