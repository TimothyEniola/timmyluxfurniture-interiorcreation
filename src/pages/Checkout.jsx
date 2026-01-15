export default function Checkout() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Guest Checkout</h1>
      <form className="grid gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Full Name"
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Phone Number"
          required
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Delivery Address"
          required
        />
        <button className="bg-[#0A1A2F] text-white py-2 rounded">
          Place Order
        </button>
      </form>
    </div>
  );
}
