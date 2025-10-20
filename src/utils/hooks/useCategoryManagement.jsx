'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '@/services/categoryService';

/**
 * Custom hook for managing categories in admin panel
 */
export const useCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all categories
  const fetchCategories = async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCategories(filters);
      setCategories(data);
      return data;
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err.message);
      toast.error('Failed to fetch categories');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch single category
  const fetchCategory = async (categoryId) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCategoryById(categoryId);
      return data;
    } catch (err) {
      console.error('Error fetching category:', err);
      setError(err.message);
      toast.error('Failed to fetch category details');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create new category
  const addCategory = async (categoryData) => {
    setLoading(true);
    setError(null);

    try {
      const newCategory = await createCategory(categoryData);
      toast.success('Category created successfully');
      
      // Refresh category list
      await fetchCategories();
      
      return newCategory;
    } catch (err) {
      console.error('Error creating category:', err);
      setError(err.message);
      toast.error('Failed to create category');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update existing category
  const editCategory = async (categoryId, categoryData) => {
    setLoading(true);
    setError(null);

    try {
      const updatedCategory = await updateCategory(categoryId, categoryData);
      toast.success('Category updated successfully');
      
      // Refresh category list
      await fetchCategories();
      
      return updatedCategory;
    } catch (err) {
      console.error('Error updating category:', err);
      setError(err.message);
      toast.error('Failed to update category');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const removeCategory = async (categoryId) => {
    setLoading(true);
    setError(null);

    try {
      await deleteCategory(categoryId);
      toast.success('Category deleted successfully');
      
      // Refresh category list
      await fetchCategories();
      
      return true;
    } catch (err) {
      console.error('Error deleting category:', err);
      setError(err.message);
      toast.error('Failed to delete category');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
    fetchCategory,
    addCategory,
    editCategory,
    removeCategory
  };
};

export default useCategoryManagement;

