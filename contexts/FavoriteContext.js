'use client';

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import {
  searchFavoriteLists,
  createFavoriteList as apiCreateList,
  deleteFavoriteList as apiDeleteList,
  createFavorite as apiAddFavorite,
  deleteFavorite as apiRemoveFavorite,
  getFavoritesByList,
} from '@/lib/api/services/favorites';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export const FavoriteContext = createContext({});

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorite must be used within a FavoriteProvider');
  }
  return context;
};

export const FavoriteProvider = ({ children }) => {
  const { isAuthenticated, loading: authLoading, selectedCustomer } = useAuth();
  const [favoriteLists, setFavoriteLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentListId, setCurrentListId] = useState(null); // ID of the list currently being viewed or modified

  // Fetch favorite lists
  const fetchFavoriteLists = useCallback(async (silent = false) => {
    if (!isAuthenticated || !selectedCustomer) {
      setFavoriteLists([]);
      setLoading(false);
      return;
    }

    if (!silent) setLoading(true);

    try {
      // Fetch all lists (pagination can be handled later if needed, for now fetching a reasonable amount)
      const result = await searchFavoriteLists({
        pageNumber: 1,
        pageSize: 100,
        sortBy: 'DateCreated',
        sortDirection: 'desc'
      });

      if (result.success && result.data?.items) {
        setFavoriteLists(result.data.items);
        // Set default list if none selected and lists exist
        if (!currentListId && result.data.items.length > 0) {
            // Logic to pick a default list could go here, e.g., the first one or one marked as default
            // For now, we just store the lists.
        }
      } else {
        setFavoriteLists([]);
      }
    } catch (error) {
      console.error('Error fetching favorite lists:', error);
      setFavoriteLists([]);
    } finally {
      if (!silent) setLoading(false);
    }
  }, [isAuthenticated, selectedCustomer, currentListId]);

  // Initialize on mount
  useEffect(() => {
    if (authLoading) return;
    if (isAuthenticated && selectedCustomer) {
      fetchFavoriteLists();
    } else {
      setFavoriteLists([]);
      setLoading(false);
    }
  }, [isAuthenticated, selectedCustomer, authLoading, fetchFavoriteLists]);

  // Create a new list
  const createList = async (data) => {
    try {
      const result = await apiCreateList(data);
      if (result.success) {
        toast.success('Favorite list created');
        await fetchFavoriteLists(true);
        return { success: true, data: result.data };
      } else {
        toast.error(result.error || 'Failed to create list');
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error creating list:', error);
      toast.error('Failed to create list');
      return { success: false, error: error.message };
    }
  };

  // Delete a list
  const deleteList = async (id) => {
    try {
      const result = await apiDeleteList(id);
      if (result.success) {
        toast.success('Favorite list deleted');
        await fetchFavoriteLists(true);
        return { success: true };
      } else {
        toast.error(result.error || 'Failed to delete list');
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error deleting list:', error);
      toast.error('Failed to delete list');
      return { success: false, error: error.message };
    }
  };

  // Add item to favorite list
  const addToFavorite = async (productId, sku, listId = null) => {
    try {
        // If no listId provided, use the first available list or create a default one
        let targetListId = listId;
        if (!targetListId) {
            if (favoriteLists.length > 0) {
                targetListId = favoriteLists[0].id;
            } else {
                // Create a default list
                const newList = await createList({
                    name: 'My Favorites',
                    description: 'Default favorite list',
                    isShared: false,
                    isEditable: true
                });
                if (newList.success) {
                    targetListId = newList.data.id;
                } else {
                    return { success: false, error: 'Could not create default list' };
                }
            }
        }

      const result = await apiAddFavorite({
        favoriteListId: targetListId,
        productId,
        sku,
        isActive: true
      });

      if (result.success) {
        toast.success('Added to favorites');
        // Optionally refresh the specific list details if we were caching them
        return { success: true };
      } else {
        toast.error(result.error || 'Failed to add to favorites');
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast.error('Failed to add to favorites');
      return { success: false, error: error.message };
    }
  };

  // Remove item from favorite list
  const removeFromFavorite = async (favoriteId) => {
    try {
      const result = await apiRemoveFavorite(favoriteId);
      if (result.success) {
        toast.success('Removed from favorites');
        return { success: true };
      } else {
        toast.error(result.error || 'Failed to remove from favorites');
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast.error('Failed to remove from favorites');
      return { success: false, error: error.message };
    }
  };

  const [productToAdd, setProductToAdd] = useState(null);

  const openSidebar = (product = null) => {
    if (product) setProductToAdd(product);
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setTimeout(() => setProductToAdd(null), 300); // Clear after animation
  };

  const value = {
    favoriteLists,
    loading,
    sidebarOpen,
    productToAdd,
    openSidebar,
    closeSidebar,
    fetchFavoriteLists,
    createList,
    deleteList,
    addToFavorite,
    removeFromFavorite,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};
