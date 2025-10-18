// Admin Product CRUD API Route
// src/app/api/product/route.js (for admin panel)

import { NextResponse } from 'next/server';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db, auth } from '@/config/firebase.config';

/**
 * Verify admin authentication
 */
async function verifyAdmin() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Not authenticated');
  }

  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (!userDoc.exists() || userDoc.data().role !== 'admin') {
    throw new Error('Unauthorized - Admin access required');
  }

  return user;
}

/**
 * GET - Fetch all products (with filters)
 */
export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryCategory = searchParams.get('category');
    const querySortBy = searchParams.get('sortBy');
    const querySearch = searchParams.get('search');
    const queryLimit = searchParams.get('limit');
    const queryStatus = searchParams.get('status');

    const productsRef = collection(db, 'products');
    let q = query(productsRef);

    // Filter by status
    if (queryStatus !== null && queryStatus !== undefined) {
      q = query(q, where('status', '==', parseInt(queryStatus)));
    }

    // Filter by category
    if (queryCategory) {
      const categories = queryCategory.split(',');
      q = query(q, where('category_ids', 'array-contains-any', categories));
    }

    // Apply sorting
    if (querySortBy === 'low-high') {
      q = query(q, orderBy('sale_price', 'asc'));
    } else if (querySortBy === 'high-low') {
      q = query(q, orderBy('sale_price', 'desc'));
    } else if (querySortBy === 'a-z') {
      q = query(q, orderBy('name', 'asc'));
    } else if (querySortBy === 'z-a') {
      q = query(q, orderBy('name', 'desc'));
    } else {
      q = query(q, orderBy('created_at', 'desc'));
    }

    // Apply limit
    if (queryLimit) {
      q = query(q, limit(parseInt(queryLimit)));
    }

    // Execute query
    const querySnapshot = await getDocs(q);
    let products = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: doc.id,
        ...data,
        created_at: data.created_at?.toDate().toISOString(),
        updated_at: data.updated_at?.toDate().toISOString()
      });
    });

    // Client-side search filter
    if (querySearch) {
      const searchTerm = querySearch.toLowerCase();
      products = products.filter(product =>
        product.name?.toLowerCase().includes(searchTerm) ||
        product.sku?.toLowerCase().includes(searchTerm)
      );
    }

    return NextResponse.json({
      data: products,
      total: products.length
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

/**
 * POST - Create a new product (Admin only)
 */
export async function POST(request) {
  try {
    // Verify admin access
    const user = await verifyAdmin();

    const productData = await request.json();

    // Validate required fields
    if (!productData.name || !productData.slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const productsRef = collection(db, 'products');
    const slugQuery = query(productsRef, where('slug', '==', productData.slug));
    const slugSnapshot = await getDocs(slugQuery);

    if (!slugSnapshot.empty) {
      return NextResponse.json(
        { error: 'Product with this slug already exists' },
        { status: 409 }
      );
    }

    // Prepare product data
    const newProduct = {
      name: productData.name,
      slug: productData.slug,
      short_description: productData.short_description || '',
      description: productData.description || '',
      type: productData.type || 'simple',
      unit: productData.unit || '1 Item',
      weight: productData.weight || 0,
      quantity: productData.quantity || 0,
      price: productData.price || 0,
      sale_price: productData.sale_price || 0,
      discount: productData.discount || 0,
      is_featured: productData.is_featured || 0,
      is_trending: productData.is_trending || 0,
      is_sale_enable: productData.is_sale_enable || 0,
      is_return: productData.is_return || 1,
      is_approved: productData.is_approved || 1,
      is_free_shipping: productData.is_free_shipping || 0,
      is_cod: productData.is_cod || '0',
      stock_status: productData.stock_status || 'in_stock',
      sku: productData.sku || '',
      sale_starts_at: productData.sale_starts_at || null,
      sale_expired_at: productData.sale_expired_at || null,
      meta_title: productData.meta_title || productData.name,
      meta_description: productData.meta_description || productData.short_description,
      product_thumbnail_url: productData.product_thumbnail_url || '',
      product_galleries: productData.product_galleries || [],
      size_chart_image_url: productData.size_chart_image_url || '',
      estimated_delivery_text: productData.estimated_delivery_text || '',
      return_policy_text: productData.return_policy_text || '',
      safe_checkout: productData.safe_checkout || 1,
      secure_checkout: productData.secure_checkout || 0,
      social_share: productData.social_share || 1,
      encourage_order: productData.encourage_order || 1,
      encourage_view: productData.encourage_view || 1,
      status: productData.status || 1,
      store_id: productData.store_id || '',
      tax_id: productData.tax_id || '',
      category_ids: productData.category_ids || [],
      tag_ids: productData.tag_ids || [],
      related_product_ids: productData.related_product_ids || [],
      cross_sell_product_ids: productData.cross_sell_product_ids || [],
      attribute_values: productData.attribute_values || {},
      variations: productData.variations || [],
      created_by_id: user.uid,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      orders_count: 0,
      reviews_count: 0,
      rating_count: 0,
      views_count: 0
    };

    // Create product
    const docRef = await addDoc(productsRef, newProduct);

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      data: {
        id: docRef.id,
        ...newProduct
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);
    
    if (error.message === 'Not authenticated') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    
    if (error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

/**
 * PUT - Update a product (Admin only)
 */
export async function PUT(request) {
  try {
    // Verify admin access
    await verifyAdmin();

    const { id, ...productData } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const productRef = doc(db, 'products', id);
    const productDoc = await getDoc(productRef);

    if (!productDoc.exists()) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Update product
    const updatedData = {
      ...productData,
      updated_at: serverTimestamp()
    };

    await updateDoc(productRef, updatedData);

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      data: {
        id,
        ...updatedData
      }
    });

  } catch (error) {
    console.error('Error updating product:', error);
    
    if (error.message === 'Not authenticated') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    
    if (error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Delete a product (Admin only)
 */
export async function DELETE(request) {
  try {
    // Verify admin access
    await verifyAdmin();

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const productRef = doc(db, 'products', productId);
    const productDoc = await getDoc(productRef);

    if (!productDoc.exists()) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Delete product
    await deleteDoc(productRef);

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    
    if (error.message === 'Not authenticated') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    
    if (error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}

