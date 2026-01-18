import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order placement
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate("/");
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (cart.length === 0 && !orderPlaced) {
    navigate("/cart");
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="py-20">
        <div className="container-custom text-center">
          <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
          <h2 className="text-4xl font-bold text-[#011F5B] mb-4">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. We'll contact you shortly.
          </p>
          <p className="text-sm text-gray-500">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="section-heading mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#011F5B] mb-6">
              Delivery Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="+234 800 000 0000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Delivery Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  rows="3"
                  placeholder="Street address"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    placeholder="Lagos"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    placeholder="Lagos"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn-secondary w-full mt-6">
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-[#011F5B] mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-bold text-[#D4AF37]">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    ₦{getCartTotal().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-[#D4AF37]">
                    ₦{getCartTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
