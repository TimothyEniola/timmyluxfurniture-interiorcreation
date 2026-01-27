import { ShoppingCart, Heart, Eye, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, showDiscount = false }) {
  const { addToCart } = useCartStore();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();
  const [isLiked, setIsLiked] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    minutes: 30,
    seconds: 25,
  });

  useEffect(() => {
    setIsLiked(wishlist.some(item => item.id === product.id));
  }, [wishlist, product.id]);

  // Mock countdown timer
  useEffect(() => {
    if (!showDiscount) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showDiscount]);

  const handleWishlistClick = async (e) => {
    e.stopPropagation(); // Prevent navigating if clicking the card usually does that
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }

    if (isLiked) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product.id);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }
    addToCart(product.id, 1);
  };

  // Calculate discount (mock - 10% for featured items)
  const discountPercentage = product.featured ? 10 : 0;


 return (
    <div className="card group relative">
      <div className="relative overflow-hidden h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {showDiscount && discountPercentage > 0 && (
          <span className="discount-badge">{discountPercentage}% off</span>
        )}

        {/* Action Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleWishlistClick}
            className={`w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-colors shadow-md ${
              isLiked ? "text-red-500" : "text-gray-400"
            }`}
          >
            <Heart size={18} className={isLiked ? "fill-current" : ""} />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-colors shadow-md">
            <Eye size={18} />
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* ... (Keep existing body content) ... */}
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        
        {/* Rating and Price Section (Keep existing) */}
        <div className="flex items-center gap-1 mb-3">
            {/* ... stars ... */}
            <span className="text-sm font-semibold text-gray-900 ml-1">4.9</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {/* ... Price logic ... */}
             <p className="text-xl font-bold text-[#D4AF37]">
                ₦{Number(product.price).toLocaleString()}
              </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="p-3 rounded-lg bg-[#D4AF37] text-white hover:bg-[#b8942a] transition-all duration-300 hover:shadow-lg"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}