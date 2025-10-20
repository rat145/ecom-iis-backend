'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  getAllOrders,
  getOrderById,
  updateOrder
} from '@/services/orderService';

/**
 * Custom hook for managing orders in admin panel
 */
export const useOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all orders
  const fetchOrders = async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAllOrders(filters);
      setOrders(data);
      return data;
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
      toast.error('Failed to fetch orders');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch single order
  const fetchOrder = async (orderId) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getOrderById(orderId);
      return data;
    } catch (err) {
      console.error('Error fetching order:', err);
      setError(err.message);
      toast.error('Failed to fetch order details');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, updates) => {
    setLoading(true);
    setError(null);

    try {
      const updatedOrder = await updateOrder(orderId, updates);
      toast.success('Order updated successfully');
      
      // Refresh order list
      await fetchOrders();
      
      return updatedOrder;
    } catch (err) {
      console.error('Error updating order:', err);
      setError(err.message);
      toast.error('Failed to update order');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update payment status
  const updatePaymentStatus = async (orderId, paymentStatus) => {
    return updateOrderStatus(orderId, { payment_status: paymentStatus });
  };

  // Update delivery status
  const updateDeliveryStatus = async (orderId, orderStatusId) => {
    return updateOrderStatus(orderId, { order_status_id: orderStatusId });
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    fetchOrder,
    updateOrderStatus,
    updatePaymentStatus,
    updateDeliveryStatus
  };
};

export default useOrderManagement;

