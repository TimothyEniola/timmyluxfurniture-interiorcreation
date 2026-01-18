import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Truck, Award, HeadphonesIcon, ShieldCheck } from "lucide-react";
import { useProducts } from "../context/ProductContext";

export default function Home() {
  const { products } = useProducts();
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#011F5B] via-[#023381] to-[#36454F] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] bg-repeat"></div>
        </div>
        
        <div className="container-custom py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <img src="/logo.svg" alt="Timmy Luxe Logo" className="h-16 w-auto mb-6" />
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              Transform your space with premium furniture designed for comfort,
              style, and timeless elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn-secondary text-center">
                Shop Now
              </Link>
              <Link
                to="/products"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-[#011F5B] transition-all duration-300 text-center"
              >
                Browse Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37] rounded-full mb-4">
                <Award className="text-[#011F5B]" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#011F5B]">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Finest materials and expert craftsmanship
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37] rounded-full mb-4">
                <Truck className="text-[#011F5B]" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#011F5B]">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Swift and reliable delivery service
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37] rounded-full mb-4">
                <ShieldCheck className="text-[#011F5B]" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#011F5B]">
                Warranty
              </h3>
              <p className="text-gray-600">
                2-year warranty on all products
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37] rounded-full mb-4">
                <HeadphonesIcon className="text-[#011F5B]" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#011F5B]">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Always here to help you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-heading">Featured Collection</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of premium furniture pieces
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-[#011F5B] text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why Choose Timmy Luxe?
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center font-bold text-[#011F5B]">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">
                      Custom Design Solutions
                    </h4>
                    <p className="text-gray-300">
                      We create furniture tailored to your unique style and
                      space requirements.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center font-bold text-[#011F5B]">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">
                      Premium Materials
                    </h4>
                    <p className="text-gray-300">
                      Only the finest wood, fabrics, and materials are used in
                      our furniture.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center font-bold text-[#011F5B]">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">
                      Expert Craftsmanship
                    </h4>
                    <p className="text-gray-300">
                      Every piece is crafted with precision and attention to
                      detail.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/8135267/pexels-photo-8135267.jpeg"
                alt="Luxury Living Room"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
