import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart, Menu, X, Search, Heart, User } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.jpeg";
export default function Navbar() {
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const { user, isAuthenticated, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchOpen && !event.target.closest('.search-container')) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  return (
    <nav className="bg-[#011F5B] text-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Timmy Luxe Logo" className="h-10" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className="hover:text-[#D4AF37] transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="hover:text-[#D4AF37] transition-colors duration-300 font-medium"
            >
              Shop
            </Link>
            {/* <div className="relative group">
              <button className="hover:text-[#D4AF37] transition-colors duration-300 font-medium">
                Categories
              </button>
            </div> */}
            <Link
              to="/custom-request"
              className="hover:text-[#D4AF37] transition-colors duration-300 font-medium"
            >
              Custom Request
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#D4AF37] transition-colors duration-300 font-medium"
            >
              Contact Us
            </Link>
            <Link
              to="/admin"
              className="hover:text-[#D4AF37] transition-colors duration-300 font-medium"
            >
              Admin
            </Link>
          </div>

          {/* Action Icons */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Search */}
            <div className="relative search-container">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="hover:text-[#D4AF37] transition-colors"
                aria-label="Search"
              >
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
                      className="px-4 py-2 bg-[#D4AF37] text-white rounded-md hover:bg-[#b8942a] transition-colors"
                    >
                      Search
                    </button>
                  </form>
                </div>
              )}
            </div>
            <Link
              to="/wishlist"
              className="hover:text-[#D4AF37] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {getWishlistCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#011F5B] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getWishlistCount()}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="hover:text-[#D4AF37] transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#011F5B] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <div className="relative group">
                <button className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <User size={20} />
                  <span className="text-sm">{user?.name}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#D4AF37] shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2  text-sm"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={signOut}
                    className="block w-full text-left px-4 py-2  text-sm cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/signin"
                className="hover:text-[#D4AF37] transition-colors"
                aria-label="Sign In"
              >
                <User size={20} />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-3 border-t pt-4">
            <Link
              to="/"
              className="block hover:text-[#D4AF37] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block hover:text-[#D4AF37] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/custom-request"
              className="block hover:text-[#D4AF37] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Custom Request
            </Link>
            <Link
              to="/contact"
              className="block hover:text-[#D4AF37] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              to="/admin"
              className="block hover:text-[#D4AF37] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
            <Link
              to="/cart"
              className="block hover:text-[#D4AF37] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cart ({getCartCount()})
            </Link>
            <Link
              to="/wishlist"
              className="block hover:text-[#D4AF37] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Wishlist ({getWishlistCount()})
            </Link>
            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="block hover:text-[#011F5B] transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left hover:text-[#D4AF37] transition-colors font-medium"
                >
                  Sign Out ({user?.name})
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="block hover:text-[#D4AF37] transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
