import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Phone, MapPin, Calendar, Camera } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { updateMyProfile, getUserAddresses } from "../api/userService"; //

export default function UserProfile() {
  // 1. Get user and actions from Zustand
  const { user, setUser } = useAuthStore();
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  
  // 2. Add state for addresses
  const [addresses, setAddresses] = useState([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

  const fileInputRef = useRef(null);

  // 3. Fetch addresses on component mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getUserAddresses();
        // Backend returns { data: [...] }, so we access response.data
        setAddresses(response.data || []); 
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      } finally {
        setIsLoadingAddresses(false);
      }
    };

    if (user) {
      fetchAddresses();
    }
  }, [user]);

  // 4. Protect the route
  if (!user) {
    return (
      <div className="container-custom py-8">
        <div className="text-center">
          <p className="text-gray-500">Please sign in to view your profile.</p>
          <Link to="/signin" className="text-[#D4AF37] hover:underline mt-2 inline-block">
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Image size must be less than 2MB");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Image = e.target.result;
      
      try {
        const response = await updateMyProfile({ profileImage: base64Image });
        // Fix: Ensure we set the correct data structure back to store
        setUser(response.data || response); 
      } catch (err) {
        console.error("Profile update failed:", err);
        setUploadError("Failed to update profile image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#011F5B] mb-8">My Profile</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header Section */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-[#011F5B] rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-sm">
                {user.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt={user.full_name || user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-white" />
                )}
              </div>
              <button
                onClick={triggerFileInput}
                disabled={isUploading}
                className="absolute bottom-0 right-0 bg-[#D4AF37] p-2 rounded-full hover:bg-[#B8952A] transition-colors disabled:opacity-50 shadow-md cursor-pointer"
                title="Change profile picture"
              >
                <Camera size={16} className="text-white" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#011F5B]">{user.full_name || user.name}</h2>
              <p className="text-gray-600 font-medium capitalize">{user.role}</p>
              {isUploading && (
                <p className="text-xs text-[#D4AF37] mt-1 animate-pulse">Uploading...</p>
              )}
              {uploadError && (
                <p className="text-xs text-red-500 mt-1">{uploadError}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Mail className="text-[#D4AF37]" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-[#D4AF37]" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">
                    {user.phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="text-[#D4AF37]" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium text-gray-900">
                    {user.created_at 
                      ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Stats */}
            <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="text-xs font-semibold text-blue-800 uppercase tracking-wide mb-1">Status</h3>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <p className="text-blue-900 font-bold">Active</p>
                    </div>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                     <h3 className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-1">Role</h3>
                     <p className="text-amber-900 font-bold capitalize">{user.role}</p>
                  </div>
               </div>
               
               <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Security</h3>
                  <p className="text-xs text-gray-500 mb-3">Last login: Just now</p>
                  <Link to="/settings" className="text-sm text-[#011F5B] hover:text-[#D4AF37] font-medium transition-colors">
                    Manage Password & Security &rarr;
                  </Link>
               </div>
            </div>
          </div>

          <hr className="my-8 border-gray-200" />

          {/* Addresses Section - Updated to use local 'addresses' state */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#011F5B]">Addresses</h3>
              <Link to="/settings" className="text-sm text-[#D4AF37] font-semibold hover:underline">
                + Add New
              </Link>
            </div>
            
            {isLoadingAddresses ? (
               <div className="text-center py-6">
                  <p className="text-gray-500 text-sm">Loading addresses...</p>
               </div>
            ) : addresses && addresses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr, index) => (
                  <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg hover:border-[#D4AF37] transition-colors group">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-gray-400 group-hover:text-[#D4AF37] mt-1" size={18} />
                      <div>
                        <h4 className="font-medium text-[#011F5B] mb-1">
                          {index === 0 ? 'Main Address' : `Address ${index + 1}`}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {[addr.houseNumber ? `House ${addr.houseNumber}` : '', addr.street].filter(Boolean).join(', ')}
                        </p>
                        <p className="text-sm text-gray-600">{addr.lga}, {addr.state}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <MapPin className="mx-auto text-gray-300 mb-2" size={32} />
                <p className="text-gray-500">No addresses saved yet.</p>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Link to="/order-history" className="block group">
              <div className="bg-gray-50 hover:bg-[#011F5B] p-6 rounded-lg transition-all duration-300">
                <h3 className="text-lg font-bold text-[#011F5B] group-hover:text-white mb-2">Order History</h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-300">View your past orders and status.</p>
              </div>
            </Link>

            <Link to="/track-order" className="block group">
              <div className="bg-gray-50 hover:bg-[#011F5B] p-6 rounded-lg transition-all duration-300">
                <h3 className="text-lg font-bold text-[#011F5B] group-hover:text-white mb-2">Track Orders</h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-300">Check shipment location in real-time.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}