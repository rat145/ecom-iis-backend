'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '@/services/productService';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Custom hook for managing products in admin panel
 */
export const useProductManagement = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchProducts = async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProducts(filters);
      setProducts(data);
      return data;
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      toast.error('Failed to fetch products');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch single product
  const fetchProduct = async (productId) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProductById(productId);
      return data;
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.message);
      toast.error('Failed to fetch product details');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create new product
  const addProduct = async (productData) => {
    setLoading(true);
    setError(null);

    try {
      const newProduct = await createProduct(productData, user.uid);
      toast.success('Product created successfully');
      
      // Refresh product list
      await fetchProducts();
      
      return newProduct;
    } catch (err) {
      console.error('Error creating product:', err);
      setError(err.message);
      toast.error('Failed to create product');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update existing product
  const editProduct = async (productId, productData) => {
    setLoading(true);
    setError(null);

    try {
      const updatedProduct = await updateProduct(productId, productData);
      toast.success('Product updated successfully');
      
      // Refresh product list
      await fetchProducts();
      
      return updatedProduct;
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err.message);
      toast.error('Failed to update product');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const removeProduct = async (productId) => {
    setLoading(true);
    setError(null);

    try {
      await deleteProduct(productId);
      toast.success('Product deleted successfully');
      
      // Refresh product list
      await fetchProducts();
      
      return true;
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err.message);
      toast.error('Failed to delete product');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProduct,
    addProduct,
    editProduct,
    removeProduct
  };
};

export default useProductManagement;

