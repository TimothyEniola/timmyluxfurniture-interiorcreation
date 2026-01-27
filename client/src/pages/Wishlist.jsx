import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useWishlistStore } from "../store/wishlistStore";
import { useCartStore } from "../store/cartStore";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import Loader from "../components/loader";

export default function Wishlist() {
  const { wishlist, fetchWishlist, removeFromWishlist, isLoading } = useWishlistStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleAddToCart = (product) => {
    addToCart(product.id, 1);
  };

  if (isLoading) return <Loader text="Loading your wishlist..." />;

  if (wishlist.length === 0) {
    return (
      <div className="py-20 bg-gray-50 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Heart size={64} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-[#011F5B] mb-2">Your Wishlist is Empty</h2>
          <p className="text-gray-500 mb-6">Save items you love to buy later.</p>
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
        <h1 className="section-heading mb-8">My Wishlist ({wishlist.length})</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="relative h-64">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button 
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full text-red-500 shadow-md hover:bg-red-50 transition"
                  title="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <h3 className="font-bold text-[#011F5B] mb-2 truncate">{product.name}</h3>
                <p className="text-lg font-bold text-[#D4AF37] mb-4">
                  ₦{Number(product.price).toLocaleString()}
                </p>
                
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full btn-outline flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-white hover:border-[#D4AF37]"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}