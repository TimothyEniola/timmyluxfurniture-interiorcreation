import { useState } from "react";
// import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { CheckCircle, CreditCard, Truck } from "lucide-react";
import { usePaystack } from "../hooks/usePaystack";
// import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, createOrder } = useAuth();
  const navigate = useNavigate();
  const { initializePayment } = usePaystack();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [completedPaymentMethod, setCompletedPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
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

    // Validate required fields
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (paymentMethod === "paystack" && !formData.email) {
      alert("Email is required for Paystack payment");
      return;
    }

    setIsProcessing(true);

    if (paymentMethod === "paystack") {
      // Handle Paystack payment
      initializePayment({
        email: formData.email,
        amount: getCartTotal(),
        customerName: formData.fullName,
        phone: formData.phone,
        onSuccess: handlePaystackSuccess,
        onClose: handlePaystackClose,
      });
    } else if (paymentMethod === "cod") {
      // Handle Cash on Delivery
      handleCashOnDelivery();
    }
  };

  const handleCashOnDelivery = () => {
    // Create order
    const orderData = {
      total: getCartTotal(),
      items: cart.map(item => ({
        product_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      shippingAddress: {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state
      },
      paymentMethod: "Cash on Delivery"
    };

    const newOrder = createOrder(orderData);
    console.log("Order created:", newOrder);

    // Simulate order placement for COD
    setCompletedPaymentMethod("Cash on Delivery");
    setOrderPlaced(true);
    setIsProcessing(false);
    setTimeout(() => {
      clearCart();
      navigate("/");
    }, 3000);
  };

  const handlePaystackSuccess = (reference) => {
    // Create order
    const orderData = {
      total: getCartTotal(),
      items: cart.map(item => ({
        product_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      shippingAddress: {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state
      },
      paymentMethod: "Paystack"
    };

    const newOrder = createOrder(orderData);
    console.log("Order created:", newOrder);

    // Handle successful payment
    console.log("Payment successful:", reference);
    setIsProcessing(false);
    setCompletedPaymentMethod("Paystack");
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate("/");
    }, 3000);
  };

  const handlePaystackClose = () => {
    // Handle payment modal close
    console.log("Payment modal closed");
    setIsProcessing(false);
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
          {completedPaymentMethod && (
            <p className="text-sm text-[#D4AF37] font-semibold mb-2">
              Payment Method: {completedPaymentMethod}
            </p>
          )}
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
                  Email Address {paymentMethod === "paystack" ? "*" : ""}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="john@example.com"
                  required={paymentMethod === "paystack"}
                />
                {paymentMethod === "paystack" && (
                  <p className="text-xs text-gray-500 mt-1">
                    Required for secure payment processing
                  </p>
                )}
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

              {/* Payment Method Selection */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-[#011F5B] mb-4">
                  Payment Method
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-[#D4AF37] transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paystack"
                      checked={paymentMethod === "paystack"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-[#D4AF37] border-gray-300 focus:ring-[#D4AF37]"
                    />
                    <CreditCard className="text-[#D4AF37]" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Pay with Card
                      </p>
                      <p className="text-sm text-gray-600">
                        Secure payment via Paystack
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-[#D4AF37] transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-[#D4AF37] border-gray-300 focus:ring-[#D4AF37]"
                    />
                    <Truck className="text-[#D4AF37]" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Cash on Delivery
                      </p>
                      <p className="text-sm text-gray-600">
                        Pay when you receive your order
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="btn-secondary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed text-white">
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : paymentMethod === "paystack" ? (
                  "Pay Now with Paystack"
                ) : (
                  "Place Order (Cash on Delivery)"
                )}
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
