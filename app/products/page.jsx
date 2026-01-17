"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import CategorySlider from "@/components/home/CategorySlider";
import FilterSection from "@/components/search/FilterSection";
import SearchResults from "@/components/search/SearchResults";
import Breadcrumb from "@/components/products/Breadcrumb";
import { filterProducts, buildFilterPayload } from "@/lib/api/services/products";
import { parseFiltersFromURL, buildURLFromFilters } from "@/lib/utils/urlHelpers";
import { CATEGORY_IMAGES } from "@/lib/constants/categoryImages";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ProductsPageSkeleton from "@/components/skeletons/ProductsPageSkeleton";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State management
  const [filters, setFilters] = useState({
    searchTerm: "",
    categories: [],
    brands: [],
    attributes: [],
    pageNumber: 1,
    pageSize: 24,
  });

  const [apiData, setApiData] = useState({
    products: [],
    categories: [],
    brands: [],
    attributes: [],
    totalRecords: 0,
  });

  const [categoryPath, setCategoryPath] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("relevance");
  const [view, setView] = useState("grid");

  const [categoryMapping, setCategoryMapping] = useState({});

  // Parse URL parameters on mount and when URL changes
  useEffect(() => {
    const parsedFilters = parseFiltersFromURL(searchParams);
    setFilters(parsedFilters);
  }, [searchParams]);

  // Update category mapping when new categories are loaded
  useEffect(() => {
    if (apiData.categories.length > 0) {
      setCategoryMapping(prev => {
        const newMapping = { ...prev };
        let changed = false;
        apiData.categories.forEach(cat => {
          const key = parseInt(cat.key);
          if (!newMapping[key]) {
            newMapping[key] = cat.name;
            changed = true;
          }
        });
        return changed ? newMapping : prev;
      });
    }
  }, [apiData.categories]);

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const payload = buildFilterPayload(filters);
        const data = await filterProducts(payload);
        
        const categoriesWithImages = (data.categories || []).map(cat => ({
          ...cat,
          imageUrl: cat.imageUrl
        }));

        setApiData({
          products: data.products || [],
          categories: categoriesWithImages,
          brands: data.brands || [],
          attributes: data.attributes || [],
          totalRecords: data.totalRecords || 0,
        });

        // Build category path for breadcrumb
        if (data.categories && filters.categories.length > 0) {
          const path = filters.categories.map(catId => {
            const found = data.categories.find(c => parseInt(c.key) === catId);
            // Try to find name in mapping if not in current response
            const name = found?.name || categoryMapping[catId] || `Category ${catId}`;
            return { key: catId.toString(), name: name };
          });
          setCategoryPath(path);
        } else {
          setCategoryPath([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setApiData({
          products: [],
          categories: [],
          brands: [],
          attributes: [],
          totalRecords: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, categoryMapping]); // Added categoryMapping to dependencies for categoryPath logic

  // Update URL when filters change
  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    const searchString = buildURLFromFilters(newFilters);
    const newURL = searchString ? `/products?${searchString}` : "/products";
    router.push(newURL, { scroll: false });
  }, [router]);

  // Handler: Category tile click
  const handleCategoryClick = useCallback((category) => {
    // Robustly extract ID (handle key or id property)
    const rawId = category.key || category.id;
    if (!rawId) {
      console.warn("Category click: Missing ID", category);
      return;
    }

    const categoryId = parseInt(rawId, 10);
    
    // Toggle logic
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    
    const newFilters = {
      ...filters,
      categories: newCategories,
      pageNumber: 1,
    };
    updateFilters(newFilters);
  }, [filters, updateFilters]);

  // Handler: Filter changes
  const handleFilterChange = useCallback((key, selectedIds) => {
    // Convert string IDs back to numbers for categories and brands
    const processedIds = (key === 'categories' || key === 'brands') 
      ? selectedIds.map(id => parseInt(id, 10))
      : selectedIds;

    const newFilters = {
      ...filters,
      [key]: processedIds,
      pageNumber: 1,
    };
    updateFilters(newFilters);
  }, [filters, updateFilters]);

  // Handler: Search within results
  const handleSearchChange = useCallback((searchTerm) => {
    const newFilters = {
      ...filters,
      searchTerm,
      pageNumber: 1,
    };
    updateFilters(newFilters);
  }, [filters, updateFilters]);

  // Handler: Page change
  const handlePageChange = useCallback((newPage) => {
    const newFilters = {
      ...filters,
      pageNumber: newPage,
    };
    updateFilters(newFilters);
  }, [filters, updateFilters]);

  // Handler: Page size change
  const handlePageSizeChange = useCallback((newPageSize) => {
    const newFilters = {
      ...filters,
      pageSize: newPageSize,
      pageNumber: 1,
    };
    updateFilters(newFilters);
  }, [filters, updateFilters]);

  // Transform data for FilterSection
  const categoryItems = useMemo(() => apiData.categories.map(c => ({
    id: c.key,
    label: c.name,
    count: c.count
  })), [apiData.categories]);

  const brandItems = useMemo(() => apiData.brands.map(b => ({
    id: b.key,
    label: b.name,
    count: b.count
  })), [apiData.brands]);

  // Render filters component
  const FiltersContent = () => (
    <div className="space-y-4">
      {categoryItems.length > 0 && (
        <FilterSection
          title="Subcategories"
          items={categoryItems}
          selected={filters.categories}
          onChange={(ids) => handleFilterChange('categories', ids)}
        />
      )}
      {brandItems.length > 0 && (
        <FilterSection
          title="Brands"
          items={brandItems}
          selected={filters.brands}
          onChange={(ids) => handleFilterChange('brands', ids)}
        />
      )}
      {apiData.attributes.map(attr => (
        <FilterSection
          key={attr.id}
          title={attr.name}
          items={attr.values.map(v => ({
            id: v.key,
            label: v.value,
            unit: v.unit,
            count: v.count
          }))}
          selected={filters.attributes}
          onChange={(ids) => handleFilterChange('attributes', ids)}
        />
      ))}
    </div>
  );

  // Get active filters for display
  const activeFilters = useMemo(() => {
    const active = [];
    
    // Categories
    filters.categories.forEach(id => {
      const cat = apiData.categories.find(c => parseInt(c.key) === id);
      const label = cat?.name || categoryMapping[id] || `Category ${id}`;
      active.push({ type: 'category', id, label, key: 'categories' });
    });

    // Brands
    filters.brands.forEach(id => {
      const brand = apiData.brands.find(b => parseInt(b.key) === id);
      if (brand) active.push({ type: 'brand', id, label: brand.name, key: 'brands' });
      else active.push({ type: 'brand', id, label: `Brand ${id}`, key: 'brands' });
    });

    // Attributes
    filters.attributes.forEach(key => {
      const parts = key.split('~|~');
      if (parts.length >= 2) {
        active.push({ type: 'attribute', id: key, label: parts[1], key: 'attributes' });
      }
    });

    return active;
  }, [filters, apiData]);

  const removeFilter = (filter) => {
    const newIds = filters[filter.key].filter(id => id !== filter.id);
    const newFilters = { ...filters, [filter.key]: newIds, pageNumber: 1 };
    updateFilters(newFilters);
  };

  const clearAllFilters = () => {
    const newFilters = {
      ...filters,
      categories: [],
      brands: [],
      attributes: [],
      searchTerm: "",
      pageNumber: 1
    };
    updateFilters(newFilters);
  };

  const totalPages = Math.max(1, Math.ceil(apiData.totalRecords / filters.pageSize));

  if (loading && apiData.products.length === 0) {
    return (
      <ProtectedRoute>
        <ProductsPageSkeleton />
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="w-full">
        <div className="container mx-auto p-4">
          {/* Breadcrumb */}
          {categoryPath.length > 0 && (
            <Breadcrumb
              categoryPath={categoryPath}
              onCategoryClick={(index) => {
                const newCategories = filters.categories.slice(0, index + 1);
                updateFilters({ ...filters, categories: newCategories, pageNumber: 1 });
              }}
            />
          )}

          {/* Category Slider */}
          {apiData.categories.length > 0 && (
            <CategorySlider
              categories={apiData.categories}
              onCategoryClick={handleCategoryClick}
            />
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-4">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block col-span-3">
              <FiltersContent />
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden col-span-12 mb-4">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    <Menu size={20} />
                    <span>Filters</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <FiltersContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Product Results */}
            <div className="col-span-12 lg:col-span-9">
              <p className="font-medium mb-4">
                {apiData.totalRecords === 0
                  ? "No items found"
                  : `Showing ${(filters.pageNumber - 1) * filters.pageSize + 1} - ${Math.min(filters.pageNumber * filters.pageSize, apiData.totalRecords)} of ${apiData.totalRecords.toLocaleString()} items`}
              </p>
              <div className="border rounded-lg bg-white">

                {/* Active Filters */}
                {activeFilters.length > 0 && (
                  <div className="p-4 border-b flex flex-wrap gap-2 items-center">
                    <span className="text-sm text-gray-500 mr-2">Active Filters:</span>
                    {activeFilters.map((filter) => (
                      <span 
                        key={`${filter.type}-${filter.id}`} 
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700"
                      >
                        {filter.label}
                        <button 
                          onClick={() => removeFilter(filter)}
                          className="hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    <button 
                      onClick={clearAllFilters}
                      className="text-sm text-red-600 hover:text-red-700 font-medium ml-2"
                    >
                      Clear All
                    </button>
                  </div>
                )}

                <SearchResults
                  products={apiData.products}
                  query={filters.searchTerm}
                  setQuery={handleSearchChange}
                  sort={sort}
                  setSort={setSort}
                  view={view}
                  setView={setView}
                />

                {/* Pagination Footer */}
                {apiData.totalRecords > 0 && (
                  <div className="p-4 border-t flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => handlePageChange(Math.max(1, filters.pageNumber - 1))}
                            size="icon"
                            className={filters.pageNumber === 1 ? "pointer-events-none opacity-50" : ""}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </PaginationLink>
                        </PaginationItem>
                        
                        {/* Simplified pagination for now */}
                        <PaginationItem>
                          <span className="px-4 text-sm">
                            Page {filters.pageNumber} of {totalPages}
                          </span>
                        </PaginationItem>

                        <PaginationItem>
                          <PaginationLink
                            onClick={() => handlePageChange(Math.min(totalPages, filters.pageNumber + 1))}
                            size="icon"
                            className={filters.pageNumber >= totalPages ? "pointer-events-none opacity-50" : ""}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </PaginationLink>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProductsPage;
