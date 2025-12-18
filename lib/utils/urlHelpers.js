// lib/utils/urlHelpers.js

/**
 * Parse filter state from URL search parameters
 * @param {URLSearchParams} searchParams - URL search parameters
 * @returns {Object} Filter state object
 */
export const parseFiltersFromURL = (searchParams) => {
  const filters = {
    searchTerm: searchParams.get('search') || '',
    categories: [],
    brands: [],
    attributes: [],
    pageNumber: 1,
    pageSize: 24,
  };

  // Parse categories (comma-separated numbers)
  const categoriesParam = searchParams.get('categories');
  if (categoriesParam) {
    filters.categories = categoriesParam
      .split(',')
      .map(id => parseInt(id.trim(), 10))
      .filter(id => !isNaN(id));
  }

  // Parse brands (comma-separated numbers)
  const brandsParam = searchParams.get('brands');
  if (brandsParam) {
    filters.brands = brandsParam
      .split(',')
      .map(id => parseInt(id.trim(), 10))
      .filter(id => !isNaN(id));
  }

  // Parse attributes (comma-separated strings with special format)
  const attributesParam = searchParams.get('attributes');
  if (attributesParam) {
    filters.attributes = attributesParam
      .split(',')
      .map(attr => decodeURIComponent(attr.trim()))
      .filter(attr => attr.length > 0);
  }

  // Parse page number
  const pageParam = searchParams.get('page');
  if (pageParam) {
    const page = parseInt(pageParam, 10);
    if (!isNaN(page) && page > 0) {
      filters.pageNumber = page;
    }
  }

  // Parse page size
  const pageSizeParam = searchParams.get('pageSize');
  if (pageSizeParam) {
    const size = parseInt(pageSizeParam, 10);
    if (!isNaN(size) && size > 0) {
      filters.pageSize = size;
    }
  }

  return filters;
};

/**
 * Build URL search string from filter state
 * @param {Object} filters - Filter state object
 * @returns {string} URL search string (without leading ?)
 */
export const buildURLFromFilters = (filters) => {
  const params = new URLSearchParams();

  // Add search term
  if (filters.searchTerm?.trim()) {
    params.set('search', filters.searchTerm.trim());
  }

  // Add categories
  if (filters.categories?.length > 0) {
    params.set('categories', filters.categories.join(','));
  }

  // Add brands
  if (filters.brands?.length > 0) {
    params.set('brands', filters.brands.join(','));
  }

  // Add attributes
  if (filters.attributes?.length > 0) {
    params.set('attributes', filters.attributes.map(attr => encodeURIComponent(attr)).join(','));
  }

  // Add page number (only if not 1)
  if (filters.pageNumber && filters.pageNumber > 1) {
    params.set('page', filters.pageNumber.toString());
  }

  // Add page size (only if not default 24)
  if (filters.pageSize && filters.pageSize !== 24) {
    params.set('pageSize', filters.pageSize.toString());
  }

  return params.toString();
};

/**
 * Update URL without page reload
 * @param {Object} filters - Filter state object
 * @param {Object} router - Next.js router instance
 */
export const updateURL = (filters, router) => {
  const searchString = buildURLFromFilters(filters);
  const newURL = searchString ? `/products?${searchString}` : '/products';
  router.push(newURL, { scroll: false });
};
