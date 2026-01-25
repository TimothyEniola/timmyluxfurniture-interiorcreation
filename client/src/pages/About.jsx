const About = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="bg-[#011F5B] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About TimmyLux Furniture & Interior
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto">
            Crafting comfort, elegance, and quality for homes, offices, and
            commercial spaces since day one.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Who We Are</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              At TimmyLux Furniture & Interior, we specialize in creating
              premium, custom-made furniture and delivering exceptional interior
              solutions that combine comfort, durability, and elegant design. We
              believe every space tells a story, and our mission is to transform
              homes, offices, and commercial spaces into beautiful, functional
              environments that reflect your unique style and personality.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              With a strong commitment to quality craftsmanship, we carefully
              select high-grade materials and apply skilled workmanship to
              ensure every piece we create meets the highest standards. From
              modern and contemporary designs to classic and luxury finishes,
              our team brings creativity, precision, and passion into every
              project.
            </p>
          </div>

          {/* Workshop Image */}
          <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.pexels.com/photos/7109998/pexels-photo-7109998.jpeg"
              alt="Craftsman working on wooden furniture - Daniel Reche on Pexels"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            The principles that guide everything we create
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D4AF37] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-xl mb-3 text-[#011F5B]">
                Quality First
              </h3>
              <p className="text-gray-600">
                We never compromise on materials or craftsmanship. Every piece
                is built to last generations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#D4AF37] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-xl mb-3 text-[#011F5B]">
                Custom Excellence
              </h3>
              <p className="text-gray-600">
                Your vision, our expertise. We create furniture that perfectly
                matches your style and space.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#D4AF37] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-xl mb-3 text-[#011F5B]">
                Customer Delight
              </h3>
              <p className="text-gray-600">
                From consultation to installation, we're committed to exceeding
                your expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            What We Do
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Comprehensive furniture and interior solutions for every space
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#D4AF37]">
              <div className="text-3xl mb-3">🛋️</div>
              <h3 className="font-semibold text-lg mb-2 text-[#011F5B]">
                Custom Furniture
              </h3>
              <p className="text-gray-600 text-sm">
                Bespoke sofas, beds, wardrobes, tables, TV stands, and more —
                designed to match your space and taste perfectly.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#D4AF37]">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-semibold text-lg mb-2 text-[#011F5B]">
                Interior Design
              </h3>
              <p className="text-gray-600 text-sm">
                Complete interior solutions including space planning, color
                coordination, and styling for homes and offices.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#D4AF37]">
              <div className="text-3xl mb-3">🏢</div>
              <h3 className="font-semibold text-lg mb-2 text-[#011F5B]">
                Office & Commercial
              </h3>
              <p className="text-gray-600 text-sm">
                Professional office furniture and interior setups for
                productivity, comfort, and modern business environments.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#D4AF37]">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold text-lg mb-2 text-[#011F5B]">
                Renovation & Upgrades
              </h3>
              <p className="text-gray-600 text-sm">
                Transforming existing spaces with modern furniture upgrades and
                fresh interior redesigns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1760072513357-9d450e935a80?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxMHx8bW9kZXJuJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBsaXZpbmclMjByb29tJTIwd2l0aCUyMGx1eHVyeSUyMGZ1cm5pdHVyZXxlbnwwfDB8fHwxNzY5MzYwMTM2fDA&ixlib=rb-4.1.0&q=85"
              alt="Modern living room with luxury furniture - Obegi Home on Unsplash"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#011F5B]">
              Why Choose TimmyLux
            </h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] text-xl font-bold">✓</span>
                <span>
                  <strong>Premium Quality:</strong> High-grade materials and
                  expert craftsmanship in every piece
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] text-xl font-bold">✓</span>
                <span>
                  <strong>Custom Designs:</strong> Tailored furniture that
                  perfectly matches your vision and space
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] text-xl font-bold">✓</span>
                <span>
                  <strong>Transparent Pricing:</strong> Affordable rates with no
                  hidden costs or surprises
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] text-xl font-bold">✓</span>
                <span>
                  <strong>Timely Delivery:</strong> Professional installation
                  and on-schedule completion
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] text-xl font-bold">✓</span>
                <span>
                  <strong>Exceptional Service:</strong> Dedicated customer
                  support and comprehensive after-sales care
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-[#011F5B] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Let's Build Your Dream Space
          </h2>
          <p className="text-gray-200 text-lg mb-8 max-w-2xl mx-auto">
            Contact TimmyLux Furniture & Interior today and let us bring your
            vision to life with style, comfort, and quality.
          </p>
          <button className="bg-[#D4AF37] hover:bg-[#b8942a] text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Get a Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
