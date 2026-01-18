import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#011F5B] text-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.svg"
              alt="Timmy Luxe Comfort"
              className="h-12 rounded-lg"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
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
              Products
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors duration-300 font-medium relative"
            >
              <ShoppingCart size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#011F5B] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <Link
              to="/admin"
              className="hover:text-[#D4AF37] transition-colors duration-300 font-medium"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link
              to="/"
              className="block hover:text-[#D4AF37] transition-colors duration-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block hover:text-[#D4AF37] transition-colors duration-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="block hover:text-[#D4AF37] transition-colors duration-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cart ({getCartCount()})
            </Link>
            <Link
              to="/admin"
              className="block hover:text-[#D4AF37] transition-colors duration-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
