import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { categories } from "../data/Products"; // Keep categories static or fetch from DB if you made an endpoint
import { useProductStore } from "../store/productStore";
import Loader from "../components/loader";

export default function Products() {
  const { products, fetchProducts, isLoading } = useProductStore();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Get search query from URL parameters
  useEffect(() => {
    const searchParam = searchParams.get('search');
    const categoryParam = searchParams.get('category');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [searchParams]);

  // Update URL when search query changes
  useEffect(() => {
    if (searchQuery) {
      const newUrl = `${window.location.pathname}?search=${encodeURIComponent(searchQuery)}`;
      window.history.replaceState(null, null, newUrl);
    } else {
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, [searchQuery]);

  if (isLoading && products.length === 0) return <Loader text="Loading collection..." />;

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-heading">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Our Premium Collection"}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {searchQuery 
              ? `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} matching your search`
              : "Browse through our exquisite range of luxury furniture"
            }
          </p>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                window.history.replaceState(null, null, window.location.pathname);
              }}
              className="mt-4 text-[#D4AF37] hover:underline"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#D4AF37] text-[#011F5B] shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No products found in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}