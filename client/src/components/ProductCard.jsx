// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProductCard({ product, showDiscount = false }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 12, minutes: 30, seconds: 25 });

  // Mock countdown timer
  useEffect(() => {
    if (!showDiscount) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showDiscount]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
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
        
        {/* Discount Badge */}
        {showDiscount && discountPercentage > 0 && (
          <span className="discount-badge">
            {discountPercentage}% off
          </span>
        )}

        {/* Availability Badge */}
        {product.available === false && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </span>
        )}

        {/* Quick Action Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleWishlistToggle}
            className={`w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-colors shadow-md ${
              isInWishlist(product.id) ? 'text-red-500' : ''
            }`}
          >
            <Heart size={18} className={isInWishlist(product.id) ? 'fill-current' : ''} />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-colors shadow-md">
            <Eye size={18} />
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Countdown Timer (only if showDiscount) */}
        {showDiscount && discountPercentage > 0 && (
          <div className={`rounded-lg p-2 mb-3 flex items-center justify-between text-xs font-semibold ${
            timeLeft.days > 2 ? 'bg-green-500' : 'bg-red-500'
          }`}>
            <div className="text-center">
              <div className="text-white text-lg">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="text-white/80">Days</div>
            </div>
            <span className="text-white text-lg">:</span>
            <div className="text-center">
              <div className="text-white text-lg">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-white/80">Hours</div>
            </div>
            <span className="text-white text-lg">:</span>
            <div className="text-center">
              <div className="text-white text-lg">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-white/80">Min</div>
            </div>
            <span className="text-white text-lg">:</span>
            <div className="text-center">
              <div className="text-white text-lg">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-white/80">Sec</div>
            </div>
          </div>
        )}

        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="text-[#fbbf24]" fill="#fbbf24" />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-900 ml-1">4.9</span>
          <span className="text-sm text-gray-500">(121)</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {discountPercentage > 0 ? (
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-[#D4AF37]">
                  ₦{Math.round(product.price * (1 - discountPercentage / 100)).toLocaleString()}
                </p>
                <p className="text-sm text-gray-400 line-through">
                  ₦{product.price.toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="text-xl font-bold text-[#D4AF37]">
                ₦{product.price.toLocaleString()}
              </p>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.available === false}
            className={`p-3 rounded-lg transition-all duration-300 hover:shadow-lg ${
              product.available === false
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-[#D4AF37] text-white hover:bg-[#b8942a]'
            }`}
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
