import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore"; // 1. Import Zustand Store
import { logout as apiLogout } from "../api/authService"; // 2. Import API Logout
import { ShoppingCart, Menu, X, Search, Heart, User } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/reallogo-removebg-preview.png";

export default function Navbar() {
  const navigate = useNavigate();
  
  // 3. Use Zustand for state
  const { user, logout: clearAuth } = useAuthStore();
  const isAuthenticated = !!user; // Derive auth state

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 4. Create a proper Sign Out handler
  const handleSignOut = async () => {
    try {
      await apiLogout(); // Call backend to clear cookies
      clearAuth();       // Clear frontend state
      setMobileMenuOpen(false); 
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchOpen && !event.target.closest(".search-container")) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  return (
    <nav className="bg-[#011F5B] text-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Timmy Luxe Logo" className="h-10 w-10 object-cover" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className="hover:text-[#D4AF37] transition-colors duration-300 font-medium">
              Home
            </Link>
            <Link
              to="/products"
              className="hover:text-[#D4AF37] transition-colors duration-300 font-medium">
              Shop
            </Link>
            <Link
              to="/custom-request"
              className="hover:text-[#D4AF37] transition-colors duration-300 font-medium">
              Custom Request
            </Link>
            <Link
              to="/About"
              className="hover:text-[#D4AF37] transition-colors duration-300 font-medium">
              About Us
            </Link>
          </div>

          {/* Action Icons */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Search */}
            <div className="relative search-container">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="hover:text-[#D4AF37] transition-colors"
                aria-label="Search">
                <Search size={20} />
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-gray-900"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#D4AF37] text-white rounded-md hover:bg-[#b8942a] transition-colors">
                      Search
                    </button>
                  </form>
                </div>
              )}
            </div>
            <Link
              to="/wishlist"
              className="hover:text-[#D4AF37] transition-colors relative"
              aria-label="Wishlist">
              <Heart size={20} />
              2
            </Link>
            <Link
              to="/cart"
              className="hover:text-[#D4AF37] transition-colors relative"
              aria-label="Cart">
              <ShoppingCart size={20} />
              2
            </Link>
            {isAuthenticated ? (
              <div className="relative group">
                <button className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  {user?.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover border-2 border-[#D4AF37]"
                    />
                  ) : (
                    <User size={20} />
                  )}
                  <span className="text-sm">{user?.name}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#D4AF37] shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/order-history"
                    className="block px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                  >
                    Order History
                  </Link>
                  <Link
                    to="/track-order"
                    className="block px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                  >
                    Track Order
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors">
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/signin"
                className="hover:text-[#D4AF37] transition-colors"
                aria-label="Sign In">
                <User size={20} />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-3 border-t pt-4">
            <Link
              to="/"
              className="block hover:text-[#D4AF37] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link
              to="/products"
              className="block hover:text-[#D4AF37] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}>
              Shop
            </Link>
            <Link
              to="/custom-request"
              className="block hover:text-[#D4AF37] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}>
              Custom Request
            </Link>
            <Link
              to="/contact"
              className="block hover:text-[#D4AF37] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}>
              Contact Us
            </Link>
            <Link
              to="/cart"
              className="block hover:text-[#D4AF37] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}>
              Cart (2)
            </Link>
            <Link
              to="/wishlist"
              className="block hover:text-[#D4AF37] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}>
              Wishlist (2)
            </Link>
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 px-2 py-2 border-b border-gray-200 mb-2">
                  {user?.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#D4AF37]"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-[#011F5B] rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-[#011F5B]">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="block hover:text-[#D4AF37] transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/settings"
                  className="block hover:text-[#D4AF37] transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <Link
                  to="/order-history"
                  className="block hover:text-[#D4AF37] transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Order History
                </Link>
                <Link
                  to="/track-order"
                  className="block hover:text-[#D4AF37] transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Track Order
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left hover:text-[#D4AF37] transition-colors font-medium">
                  Sign Out ({user?.name})
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="block hover:text-[#D4AF37] transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}>
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}