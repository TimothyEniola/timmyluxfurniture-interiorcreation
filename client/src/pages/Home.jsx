import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <section className="text-center py-20 bg-[#D4AF37] text-[#0A1A2F] rounded-xl mb-10">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Timmy Luxe Comfort
        </h1>
        <p className="text-lg mb-6">
          Luxury furniture crafted for comfort and style.
        </p>
        <Link
          to="/products"
          className="bg-[#0A1A2F] text-white px-6 py-3 rounded hover:bg-[#132f52]">
          Shop Now
        </Link>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-xl p-4 shadow text-center">
          <h2 className="font-semibold text-xl mb-2">Premium Materials</h2>
          <p>Only the finest wood and fabrics are used for our furniture.</p>
        </div>
        <div className="border rounded-xl p-4 shadow text-center">
          <h2 className="font-semibold text-xl mb-2">Custom Designs</h2>
          <p>We make furniture tailored to your style and space.</p>
        </div>
        <div className="border rounded-xl p-4 shadow text-center">
          <h2 className="font-semibold text-xl mb-2">Fast Delivery</h2>
          <p>Reliable delivery service across the city and beyond.</p>
        </div>
      </section>
    </div>
  );
}


