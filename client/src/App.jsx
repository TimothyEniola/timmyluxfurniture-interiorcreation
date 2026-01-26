import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminOrders from "./pages/AdminOrders";
import UserProfile from "./pages/UserProfile";
import UserSettings from "./pages/UserSettings";
import OrderHistory from "./pages/OrderHistory";
import TrackOrder from "./pages/TrackOrder";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CustomRequest from "./pages/CustomRequest";
import Notifications from "./pages/Notifications";
import About from "./pages/About";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); // Verifies session with backend on load
  }, [checkAuth]);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <TopBar />}
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}

      <div className="flex-grow">
        <Routes>
          {/* === PUBLIC ROUTES === */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />

          {/* === USER PROTECTED ROUTES === */}
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/custom-request" element={<CustomRequest />} />
          </Route>

          {/* ADMIN PROTECTED ROUTE */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/add-product" element={<AdminAddProduct />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/notifications" element={<Notifications />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
