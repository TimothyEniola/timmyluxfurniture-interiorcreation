import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('timmylux-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('timmylux-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('timmylux-user');
    }
  }, [user]);

  const signIn = (email, password) => {
    // Simple admin check - In production, this would be a real API call
    if (email === "admin@timmylux.com" && password === "admin123") {
      const adminUser = {
        email,
        name: "Admin",
        role: "admin",
        profileImage: "https://i.pravatar.cc/150?u=admin",
        phone: "",
        address: "",
        addresses: [],
        orders: [],
      };
      setUser(adminUser);
      return { success: true, user: adminUser };
    }
    // Regular user login
    const regularUser = {
      email,
      name: email.split("@")[0],
      role: "customer",
      profileImage: `https://i.pravatar.cc/150?u=${email}`,
      phone: "",
      address: "",
      addresses: [],
      orders: [],
    };
    setUser(regularUser);
    return { success: true, user: regularUser };
  };

  const signUp = (name, email, password) => {
    // In production, this would be a real API call
    const newUser = {
      email,
      name,
      role: "customer",
      profileImage: `https://i.pravatar.cc/150?u=${email}`,
      phone: "",
      address: "",
      addresses: [],
      orders: [],
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const signOut = () => {
    setUser(null);
  };

  const updateUser = (updates) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const createOrder = (orderData) => {
    const orderId = `ORD-${Date.now()}`;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      status: 'processing',
      total: orderData.total,
      items: orderData.items,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      tracking: {
        status: "Processing",
        location: "Order Processing Center",
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
        history: [
          {
            status: "Order Placed",
            date: new Date().toLocaleString(),
            location: "Online Order",
            completed: true
          }
        ]
      }
    };

    setUser(prev => prev ? { 
      ...prev, 
      orders: [newOrder, ...(prev.orders || [])] 
    } : null);

    return newOrder;
  };

  const updateOrderStatus = (orderId, status, location) => {
    setUser(prev => {
      if (!prev) return null;
      
      const updatedOrders = prev.orders.map(order => {
        if (order.id === orderId) {
          const newHistoryEntry = {
            status: status,
            date: new Date().toLocaleString(),
            location: location,
            completed: true
          };
          
          return {
            ...order,
            status: status.toLowerCase(),
            tracking: {
              ...order.tracking,
              status: status,
              location: location,
              history: [...order.tracking.history, newHistoryEntry]
            }
          };
        }
        return order;
      });
      
      return { ...prev, orders: updatedOrders };
    });
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        updateUser,
        createOrder,
        updateOrderStatus,
        isAdmin,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
