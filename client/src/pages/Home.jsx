import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import {
  Package,
  CreditCard,
  Headphones,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { useProducts } from "../context/ProductContext";
import { useState, useEffect } from "react";

export default function Home() {
  const { products } = useProducts();
  const featuredProducts = products.filter((p) => p.featured);
  const [activeTab, setActiveTab] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1759691555105-17e609a3e46f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw3fHxNb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3IlMjB3aXRoJTIwc29mYSUyMGFuZCUyMGZ1cm5pdHVyZSUyMG1vZGVybnxlbnwwfDB8fHwxNzY4NzQ3NDI1fDA&ixlib=rb-4.1.0&q=85",
      title: "Living Room",
      items: "2,500+ Items",
    },
    {
      image:
        "https://images.unsplash.com/photo-1750420556288-d0e32a6f517b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxDb250ZW1wb3JhcnklMjBiZWRyb29tJTIwaW50ZXJpb3IlMjB3aXRoJTIwYmVkJTIwbW9kZXJufGVufDB8MHx8fDE3Njg3NDc0MjV8MA&ixlib=rb-4.1.0&q=85",
      title: "Bed Room",
      items: "1,500+ Items",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter products based on active tab
  const getFilteredProducts = () => {
    switch (activeTab) {
      case "latest":
        return products.slice(-6);
      case "bestsellers":
        return products.filter((p) => p.featured).slice(0, 6);
      case "featured":
        return featuredProducts.slice(0, 6);
      default:
        return products.slice(0, 6);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-12 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block bg-[#D4AF37] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                The Best Online Furniture Store
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Explore Our Modern
                <br />
                Furniture Collection
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-md">
                Discover timeless elegance and modern comfort with our curated
                collection of premium furniture. Transform your space with
                pieces that blend luxury craftsmanship with contemporary design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/products"
                  className="btn-primary text-center inline-flex items-center justify-center">
                  Shop Now →
                </Link>
                <Link to="/products" className="btn-outline text-center">
                  View All Products
                </Link>
              </div>

              {/* Ratings Display */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <img
                    src="https://i.pravatar.cc/40?u=user1"
                    alt="Customer"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://i.pravatar.cc/40?u=user2"
                    alt="Customer"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://i.pravatar.cc/40?u=user3"
                    alt="Customer"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://i.pravatar.cc/40?u=user4"
                    alt="Customer"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[#fbbf24]">
                    <Star size={18} fill="#fbbf24" />
                    <span className="font-bold text-gray-900">
                      4.9 Ratings+
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Trusted by 500+ Customers
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Room Showcases */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group overflow-hidden rounded-2xl col-span-2">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">
                    {slides[currentSlide].title}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {slides[currentSlide].items}
                  </p>
                </div>
                <button className="absolute bottom-4 right-4 w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-white hover:bg-[#b8942a] transition-colors">
                  →
                </button>
                {/* Animated Shop Now Button */}
                <div className="absolute top-4 left-4 animate-bounce">
                  <Link
                    to="/products"
                    className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#B8952A] text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Shop Now →
                  </Link>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="col-span-2 flex items-center justify-center gap-4">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white hover:bg-[#b8942a] transition-colors">
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 bg-[#fbbf24] rounded-full flex items-center justify-center text-white hover:bg-[#f59e0b] transition-colors">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-[#fbbf24] rounded-full flex items-center justify-center">
                  <Package className="text-white" size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-gray-900">
                  Free Shipping
                </h3>
                <p className="text-gray-600 text-sm">
                  Free shipping for order above $180
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-[#fbbf24] rounded-full flex items-center justify-center">
                  <CreditCard className="text-white" size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-gray-900">
                  Flexible Payment
                </h3>
                <p className="text-gray-600 text-sm">
                  Multiple secure payment options
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-[#fbbf24] rounded-full flex items-center justify-center">
                  <Headphones className="text-white" size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-gray-900">
                  24×7 Support
                </h3>
                <p className="text-gray-600 text-sm">
                  We support online all days
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Chairs Category */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[#fbbf24] font-semibold text-sm mb-1">
                    1500+ Items
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Chairs
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>Executive Office Chairs</li>
                    <li>Lounge Chair</li>
                    <li>Reading Chair</li>
                    <li>Dining Chair</li>
                    <li>Office Chair</li>
                    <li>Armchair</li>
                    <li>Bar Stool</li>
                    <li>Club Chair</li>
                  </ul>
                </div>
                <img
                  src="https://images.pexels.com/photos/7614546/pexels-photo-7614546.jpeg"
                  alt="Chair"
                  className="w-32 h-40 object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Sofa Category */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[#fbbf24] font-semibold text-sm mb-1">
                    750+ Items
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Sofa
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>Reclining Sofa</li>
                    <li>Sectional Sofa</li>
                    <li>Armless Sofa</li>
                    <li>Curved Sofa</li>
                  </ul>
                </div>
                <img
                  src="https://images.pexels.com/photos/15253321/pexels-photo-15253321.jpeg"
                  alt="Sofa"
                  className="w-32 h-40 object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Lighting Category */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[#fbbf24] font-semibold text-sm mb-1">
                    450+ Items
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Lighting
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>Table Lights</li>
                    <li>Floor Lights</li>
                    <li>Ceiling Lights</li>
                    <li>Wall Lights</li>
                  </ul>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1758983304673-5a2d091e43e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyNXx8TW9kZXJuJTIwcGVuZGFudCUyMGxhbXAlMjBjb3BwZXIlMjBoYW5naW5nJTIwbGlnaHQlMjBsaWdodGluZ3xlbnwwfDF8fHwxNzY4NzQ3NDI1fDA&ixlib=rb-4.1.0&q=85"
                  alt="Lighting"
                  className="w-32 h-40 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-2">Our Products</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Products Collections
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-[#D4AF37] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}>
              All Products
            </button>
            <button
              onClick={() => setActiveTab("latest")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeTab === "latest"
                  ? "bg-[#D4AF37] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}>
              Latest Products
            </button>
            <button
              onClick={() => setActiveTab("bestsellers")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeTab === "bestsellers"
                  ? "bg-[#D4AF37] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}>
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab("featured")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeTab === "featured"
                  ? "bg-[#D4AF37] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}>
              Featured Products
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getFilteredProducts().map((product) => (
              <ProductCard key={product.id} product={product} showDiscount />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="btn-outline">
              View All Products →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
