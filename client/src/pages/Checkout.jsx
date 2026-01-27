import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Truck } from "lucide-react";

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, createOrder } = useAuth();
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);
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

    setIsProcessing(true);
    handleCashOnDelivery();
  };

  const handleCashOnDelivery = () => {
    const orderData = {
      total: getCartTotal(),
      items: cart.map((item) => ({
        product_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      shippingAddress: {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
      },
      paymentMethod: "Cash on Delivery",
    };

    const newOrder = createOrder(orderData);
    console.log("Order created:", newOrder);

    setOrderPlaced(true);
    setIsProcessing(false);

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
          <p className="text-sm text-[#D4AF37] font-semibold mb-2">
            Payment Method: Cash on Delivery
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
              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email (optional)"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />

              <textarea
                name="address"
                placeholder="Delivery Address *"
                value={formData.address}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                rows="3"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City *"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg"
                  required
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State *"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg"
                  required
                />
              </div>

              {/* Payment Method (COD Only) */}
              <div className="flex items-center gap-3 p-4 border rounded-lg mt-4">
                <Truck className="text-[#D4AF37]" />
                <div>
                  <p className="font-semibold">Cash on Delivery</p>
                  <p className="text-sm text-gray-600">
                    Pay when you receive your order
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="btn-secondary w-full mt-6 disabled:opacity-50">
                {isProcessing
                  ? "Processing..."
                  : "Place Order (Cash on Delivery)"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-[#011F5B] mb-6">
              Order Summary
            </h2>

            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                  <p className="font-bold text-[#D4AF37]">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}

            <div className="border-t pt-4 flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold text-[#D4AF37]">
                ₦{getCartTotal().toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
