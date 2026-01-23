import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications based on user role
  useEffect(() => {
    if (!user) return;

    let mockNotifications = [];

    if (user.role === 'admin') {
      // Admin notifications
      mockNotifications = [
        {
          id: 1,
          type: 'order',
          title: 'New Order Received',
          message: 'Order #1234 has been placed by John Doe',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          read: false,
          priority: 'high'
        },
        {
          id: 2,
          type: 'custom_request',
          title: 'Custom Furniture Request',
          message: 'Sarah Johnson requested a custom dining set',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          read: false,
          priority: 'medium'
        },
        {
          id: 3,
          type: 'low_stock',
          title: 'Low Stock Alert',
          message: 'Product "Luxury Sofa" has only 2 items left',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
          read: false,
          priority: 'medium'
        }
      ];
    } else {
      // Client notifications - only admin announcements, no order notifications
      mockNotifications = [
        {
          id: 1,
          type: 'admin_update',
          title: 'New Collection Available!',
          message: 'Check out our latest luxury furniture collection with 20% off',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
          read: false,
          priority: 'high'
        },
        {
          id: 2,
          type: 'discount',
          title: 'Flash Sale Alert!',
          message: 'Limited time: 30% off on all bedroom furniture',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
          read: false,
          priority: 'high'
        },
        {
          id: 3,
          type: 'trending',
          title: 'Trending Product',
          message: 'Luxury Armchair is now trending - don\'t miss out!',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          read: true,
          priority: 'low'
        },
        {
          id: 4,
          type: 'new_product',
          title: 'New Product Added',
          message: 'Discover our new Modern Dining Table - elegant and affordable',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
          read: true,
          priority: 'medium'
        }
      ];
    }

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, [user]);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      priority: 'medium',
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  // Admin-specific notification helpers
  const addOrderNotification = (orderDetails) => {
    addNotification({
      type: 'order',
      title: 'New Order Received',
      message: `Order #${orderDetails.id} has been placed by ${orderDetails.customerName}`,
      priority: 'high'
    });
  };

  const addCustomRequestNotification = (requestDetails) => {
    addNotification({
      type: 'custom_request',
      title: 'Custom Furniture Request',
      message: `${requestDetails.customerName} requested ${requestDetails.itemType}`,
      priority: 'medium'
    });
  };

  const addLowStockNotification = (productDetails) => {
    addNotification({
      type: 'low_stock',
      title: 'Low Stock Alert',
      message: `Product "${productDetails.name}" has only ${productDetails.stock} items left`,
      priority: 'medium'
    });
  };

  // Client-specific notification helpers
  const addAdminUpdateNotification = (updateDetails) => {
    addNotification({
      type: 'admin_update',
      title: updateDetails.title || 'Store Update',
      message: updateDetails.message,
      priority: updateDetails.urgent ? 'high' : 'medium'
    });
  };

  const addDiscountNotification = (discountDetails) => {
    addNotification({
      type: 'discount',
      title: 'Special Discount!',
      message: discountDetails.message,
      priority: 'high'
    });
  };

  const addNewProductNotification = (productDetails) => {
    addNotification({
      type: 'new_product',
      title: 'New Product Added',
      message: `Discover our new ${productDetails.name} - ${productDetails.description || 'elegant and affordable'}`,
      priority: 'medium'
    });
  };

  const addTrendingNotification = (productDetails) => {
    addNotification({
      type: 'trending',
      title: 'Trending Product',
      message: `"${productDetails.name}" is now trending - check it out!`,
      priority: 'low'
    });
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const removeNotification = (id) => {
    const notification = notifications.find(n => n.id === id);
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      // Admin helpers
      addOrderNotification,
      addCustomRequestNotification,
      addLowStockNotification,
      // Client helpers
      addAdminUpdateNotification,
      addDiscountNotification,
      addNewProductNotification,
      addTrendingNotification,
      // General
      markAsRead,
      markAllAsRead,
      removeNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};