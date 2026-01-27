import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Loader from "../components/loader";
import { useNavigate } from "react-router-dom";
import {
  Package,
  CreditCard,
  Headphones,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useProductStore } from "../store/productStore";

export default function Home() {
  const navigate = useNavigate();
  const { products, fetchProducts, isLoading } = useProductStore();
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const featuredProducts = products.filter((p) => p.featured);
  const [activeTab, setActiveTab] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [chairsExpanded, setChairsExpanded] = useState(false);
  const [sofaExpanded, setSofaExpanded] = useState(false);
  const [lightingExpanded, setLightingExpanded] = useState(false);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1759691555105-17e609a3e46f?auto=format&fit=crop&q=80",
      title: "Living Room",
      items: "2,500+ Items",
    },
    {
      image: "https://images.unsplash.com/photo-1750420556288-d0e32a6f517b?auto=format&fit=crop&q=80",
      title: "Bed Room",
      items: "1,500+ Items",
    },
  ];

  const categoryHighlights = [
    {
      title: "Living Room",
      count: "200+ Items",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      subcategories: ["Sofa Sets", "Coffee Tables", "Armchairs", "TV Units"]
    },
    {
      title: "Bedroom",
      count: "150+ Items",
      image: "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg",
      subcategories: ["Beds", "Wardrobes", "Nightstands", "Dressers"]
    },
    {
      title: "Dining",
      count: "80+ Items",
      image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
      subcategories: ["Dining Tables", "Chairs", "Sideboards", "Bar Stools"]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide
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
        return products.slice(0, 6); // Just take first 6 for now as latest
      case "bestsellers":
        return products.filter((p) => p.featured).slice(0, 6);
      case "featured":
        return featuredProducts.slice(0, 6);
      default:
        return products.slice(0, 6);
    }
  };

  if (isLoading) {
    return <Loader text="Loading luxury furniture..." />;
  }

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

              {/* Ratings */}
              <div className="flex items-center gap-4">
                {/* ... (Keep existing avatars code) ... */}
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

            {/* Right Content - Slider */}
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
                {/* ... (Keep existing slider buttons) ... */}
              </div>
              
              {/* Slider Controls */}
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
           {/* ... (Keep existing features code) ... */}
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
            {/* Add other features here as they were */}
          </div>
        </div>
      </section>

      {/* Categories Section - Keeping static images for categories for now */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
             <p className="text-gray-600">Explore our wide range of collections</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryHighlights.map((cat, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(`/products?category=${encodeURIComponent(cat.title)}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[#fbbf24] font-semibold text-sm mb-1">
                      {cat.count}
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#D4AF37] transition-colors">
                      {cat.title}
                    </h3>
                    <ul className="space-y-2 text-gray-600 text-sm mb-4">
                      {cat.subcategories.map((sub, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                          {sub}
                        </li>
                      ))}
                    </ul>
                    <span className="text-[#D4AF37] font-semibold text-sm hover:underline inline-flex items-center gap-1">
                      View Collection <ChevronRight size={14} />
                    </span>
                  </div>
                  <div className="w-32 h-40 rounded-lg overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
             <button 
               onClick={() => navigate('/products')}
               className="text-[#011F5B] font-semibold hover:text-[#D4AF37] transition-colors"
             >
               View All Categories →
             </button>
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
            {["all", "latest", "bestsellers", "featured"].map((tab) => (
               <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-6 py-2 rounded-full font-semibold transition-all capitalize ${
                 activeTab === tab
                   ? "bg-[#D4AF37] text-white"
                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
               }`}>
               {tab === "bestsellers" ? "Best Sellers" : `${tab} Products`}
             </button>
            ))}
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