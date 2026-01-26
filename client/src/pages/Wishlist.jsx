// import { useWishlist } from "../context/WishlistContext";
// import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="py-20">
        <div className="container-custom text-center">
          <Heart size={80} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-3xl font-bold text-[#011F5B] mb-4">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-600 mb-8">
            Save your favorite items for later!
          </p>
          <Link to="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <h1 className="section-heading mb-8">My Wishlist</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition"
                  aria-label="Remove from wishlist">
                  <Heart size={16} className="text-red-500 fill-current" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-[#011F5B] mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <p className="text-xl font-bold text-[#D4AF37] mb-4">
                  ₦{product.price.toLocaleString()}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="btn-secondary w-full flex items-center justify-center gap-2">
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
