import { useAuth } from "../context/AuthContext";
import { User, Mail, Phone, MapPin, Calendar, Camera } from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const { user, updateUser } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  if (!user) {
    return (
      <div className="container-custom py-8">
        <div className="text-center">
          <p className="text-gray-500">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      
      // Create a FileReader to read the image
      const reader = new FileReader();
      reader.onload = (e) => {
        // In a real app, you would upload to a server here
        // For now, we'll use the data URL directly
        updateUser({ profileImage: e.target.result });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#011F5B] mb-8">My Profile</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-[#011F5B] rounded-full flex items-center justify-center overflow-hidden">
                {user.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-white" />
                )}
              </div>
              <button
                onClick={triggerFileInput}
                disabled={isUploading}
                className="absolute bottom-0 right-0 bg-[#D4AF37] p-2 rounded-full hover:bg-[#B8952A] transition-colors disabled:opacity-50"
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
              <h2 className="text-2xl font-bold text-[#011F5B]">{user.name}</h2>
              <p className="text-gray-600">{user.role === 'admin' ? 'Administrator' : 'Customer'}</p>
              {isUploading && (
                <p className="text-sm text-[#D4AF37] mt-1">Uploading...</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Mail className="text-[#D4AF37]" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              {user.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="text-[#D4AF37]" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
              )}

              {user.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="text-[#D4AF37]" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{user.address}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Calendar className="text-[#D4AF37]" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">January 2024</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#011F5B] mb-2">Account Status</h3>
                <p className="text-green-600 font-medium">Active</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#011F5B] mb-2">Role</h3>
                <p className="font-medium capitalize">{user.role}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#011F5B] mb-2">Recent Activity</h3>
                <p className="text-sm text-gray-600">Last login: Today</p>
              </div>
            </div>
          </div>

          {/* Addresses Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-[#011F5B] mb-4">Addresses</h3>
            {user.addresses && user.addresses.length > 0 ? (
              <div className="space-y-4">
                {user.addresses.map((addr, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-[#011F5B] mb-2">
                      {index === 0 ? 'Address One Main Address' : `Address ${index + 1}`}
                    </h4>
                    {addr.houseNumber && <p className="text-gray-700">House {addr.houseNumber}</p>}
                    <p className="text-gray-700">{addr.street}</p>
                    <p className="text-gray-700">{addr.lga}, {addr.state}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No addresses added yet.</p>
            )}
          </div>

          {/* History Section */}
          <div className="mt-8">
            <Link to="/order-history" className="block">
              <h3 className="text-xl font-bold text-[#011F5B] mb-4 hover:text-[#D4AF37] transition-colors">Order History</h3>
            </Link>
            <p className="text-gray-500">View your past orders and purchase history.</p>
          </div>

          {/* Track Order Section */}
          <div className="mt-8">
            <Link to="/track-order" className="block">
              <h3 className="text-xl font-bold text-[#011F5B] mb-4 hover:text-[#D4AF37] transition-colors">Track Orders</h3>
            </Link>
            <p className="text-gray-500">Track the status and location of your current orders.</p>
          </div>
        </div>
      </div>
    </div>
  );
}