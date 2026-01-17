import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="card group">
      <div className="relative overflow-hidden h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.featured && (
          <span className="absolute top-4 left-4 bg-[#D4AF37] text-[#011F5B] px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <h3 className="text-lg font-bold text-[#011F5B] mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-[#D4AF37]">
            ₦{product.price.toLocaleString()}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-[#011F5B] text-white p-3 rounded-lg hover:bg-[#023381] transition-all duration-300 hover:shadow-lg"
            aria-label="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
