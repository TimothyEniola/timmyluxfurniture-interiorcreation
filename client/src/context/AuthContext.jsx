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
        isAdmin,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
