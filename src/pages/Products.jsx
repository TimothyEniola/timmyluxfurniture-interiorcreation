import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { categories } from "../data/Products";
import { useProducts } from "../context/ProductContext";

export default function Products() {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-heading">Our Premium Collection</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse through our exquisite range of luxury furniture
          </p>
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
