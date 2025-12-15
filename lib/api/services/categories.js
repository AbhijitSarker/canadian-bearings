import apiClient from "../client";

export const categoryService = {
    getSubCategories: async (categoryId = null) => {
        try {
            const url = categoryId 
                ? `/category/get-subcategories?categoryId=${categoryId}`
                : '/category/get-subcategories';
            const response = await apiClient.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
};
