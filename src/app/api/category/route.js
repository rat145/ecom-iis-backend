// Admin Category CRUD API Route
// src/app/api/category/route.js (for admin panel)

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
 * GET - Fetch all categories
 */
export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryType = searchParams.get('type');
    const queryStatus = searchParams.get('status');

    const categoriesRef = collection(db, 'categories');
    let q = query(categoriesRef);

    // Filter by type
    if (queryType) {
      q = query(q, where('type', '==', queryType));
    }

    // Filter by status
    if (queryStatus !== null && queryStatus !== undefined) {
      q = query(q, where('status', '==', parseInt(queryStatus)));
    }

    // Apply sorting
    q = query(q, orderBy('name', 'asc'));

    // Execute query
    const querySnapshot = await getDocs(q);
    const categories = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      categories.push({
        id: doc.id,
        ...data,
        created_at: data.created_at?.toDate().toISOString(),
        updated_at: data.updated_at?.toDate().toISOString()
      });
    });

    return NextResponse.json({
      data: categories,
      total: categories.length
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

/**
 * POST - Create a new category (Admin only)
 */
export async function POST(request) {
  try {
    // Verify admin access
    const user = await verifyAdmin();

    const categoryData = await request.json();

    // Validate required fields
    if (!categoryData.name || !categoryData.slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const categoriesRef = collection(db, 'categories');
    const slugQuery = query(categoriesRef, where('slug', '==', categoryData.slug));
    const slugSnapshot = await getDocs(slugQuery);

    if (!slugSnapshot.empty) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 409 }
      );
    }

    // Prepare category data
    const newCategory = {
      name: categoryData.name,
      slug: categoryData.slug,
      description: categoryData.description || '',
      category_image_url: categoryData.category_image_url || '',
      category_icon_url: categoryData.category_icon_url || '',
      status: categoryData.status || 1,
      type: categoryData.type || 'product',
      parent_id: categoryData.parent_id || null,
      created_by_id: user.uid,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      products_count: 0,
      blogs_count: 0
    };

    // Create category
    const docRef = await addDoc(categoriesRef, newCategory);

    return NextResponse.json({
      success: true,
      message: 'Category created successfully',
      data: {
        id: docRef.id,
        ...newCategory
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating category:', error);
    
    if (error.message === 'Not authenticated') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    
    if (error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

/**
 * PUT - Update a category (Admin only)
 */
export async function PUT(request) {
  try {
    // Verify admin access
    await verifyAdmin();

    const { id, ...categoryData } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    const categoryRef = doc(db, 'categories', id);
    const categoryDoc = await getDoc(categoryRef);

    if (!categoryDoc.exists()) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Update category
    const updatedData = {
      ...categoryData,
      updated_at: serverTimestamp()
    };

    await updateDoc(categoryRef, updatedData);

    return NextResponse.json({
      success: true,
      message: 'Category updated successfully',
      data: {
        id,
        ...updatedData
      }
    });

  } catch (error) {
    console.error('Error updating category:', error);
    
    if (error.message === 'Not authenticated') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    
    if (error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Delete a category (Admin only)
 */
export async function DELETE(request) {
  try {
    // Verify admin access
    await verifyAdmin();

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('id');

    if (!categoryId) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    const categoryRef = doc(db, 'categories', categoryId);
    const categoryDoc = await getDoc(categoryRef);

    if (!categoryDoc.exists()) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check if category has subcategories
    const categoriesRef = collection(db, 'categories');
    const subcategoriesQuery = query(categoriesRef, where('parent_id', '==', categoryId));
    const subcategoriesSnapshot = await getDocs(subcategoriesQuery);

    if (!subcategoriesSnapshot.empty) {
      return NextResponse.json(
        { error: 'Cannot delete category with subcategories' },
        { status: 400 }
      );
    }

    // Delete category
    await deleteDoc(categoryRef);

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting category:', error);
    
    if (error.message === 'Not authenticated') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    
    if (error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}

