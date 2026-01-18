import { Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaXTwitter, FaPinterest } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="bg-[#D4AF37] text-white py-2">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm gap-2">
          {/* Contact Info */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>Call Us: +234 8140838535</span>
            </div>
          </div>

          {/* Sign Up Link & Social Icons */}
          <div className="flex items-center gap-6">
            <Link 
              to="/signup" 
              className="hover:text-[#011F5B] transition-colors"
            >
              Sign up and GET 25% OFF for your first order. <span className="font-semibold underline">Sign up now</span>
            </Link>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-[#fbbf24] transition-colors" aria-label="Facebook">
                <FaFacebook size={16} />
              </a>
              <a href="#" className="hover:text-[#fbbf24] transition-colors" aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="hover:text-[#fbbf24] transition-colors" aria-label="YouTube">
                <FaYoutube size={16} />
              </a>
              <a href="#" className="hover:text-[#fbbf24] transition-colors" aria-label="Twitter">
                <FaXTwitter size={16} />
              </a>
              <a href="#" className="hover:text-[#fbbf24] transition-colors" aria-label="Pinterest">
                <FaPinterest size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
