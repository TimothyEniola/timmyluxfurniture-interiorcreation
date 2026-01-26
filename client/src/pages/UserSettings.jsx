import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Shield, Bell, Camera } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { updateMyProfile, changePassword, addUserAddress } from "../api/userService";

export default function UserSettings() {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isUploading, setIsUploading] = useState(false);
  
  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [addressData, setAddressData] = useState({
    street: '',
    lga: '',
    state: '',
    houseNumber: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Sync state with User Store on load
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.full_name || user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container-custom py-8 text-center">
        <p className="text-gray-500">Please sign in to access settings.</p>
      </div>
    );
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      // API expects 'full_name', map 'name' to it
      const payload = { ...formData, full_name: formData.name };
      const response = await updateMyProfile(payload);
      
      setUser(response.data); // Update global store
      alert('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update profile.');
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB.');
        return;
      }
      setIsUploading(true);
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          // Send base64 string to backend
          const response = await updateMyProfile({ profileImage: e.target.result });
          setUser(response.data);
          alert('Profile image updated successfully!');
        } catch (err) {
          alert('Failed to upload image');
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddressUpdate = async (e) => {
    e.preventDefault();
    try {
      // NOTE: Ensure your backend has the /users/addresses endpoint implemented!
      await addUserAddress(addressData);
      setAddressData({ street: '', lga: '', state: '', houseNumber: '' });
      alert('Address added successfully!');
      // Ideally fetch updated profile here to show the new address
    } catch (error) {
       console.log("Backend address endpoint might be missing", error);
       alert('Address feature coming soon!'); 
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      alert('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to change password');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#011F5B] mb-8">Account Settings</h1>

        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#D4AF37] text-[#D4AF37]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Profile Image */}
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gray-50 rounded-lg">
                  <div className="relative">
                    <div className="w-20 h-20 bg-[#011F5B] rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow">
                      {user?.profileImage ? (
                        <img src={user.profileImage} alt={user.full_name} className="w-full h-full object-cover" />
                      ) : (
                        <User size={32} className="text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-medium text-[#011F5B] mb-2">Profile Picture</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Upload a new profile picture. Max size: 2MB.
                    </p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8952A] transition-colors cursor-pointer disabled:opacity-50">
                      <Camera size={16} />
                      {isUploading ? 'Uploading...' : 'Change Picture'}
                      <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="hidden" />
                    </label>
                  </div>
                </div>

                <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none"
                      placeholder="+234..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" className="btn-primary w-full md:w-auto">Save Changes</button>
                  </div>
                </form>

                <div className="mt-8 border-t pt-8">
                  <h3 className="text-xl font-semibold text-[#011F5B] mb-4">Add New Address</h3>
                  <form onSubmit={handleAddressUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Street Name"
                      value={addressData.street}
                      onChange={(e) => setAddressData(prev => ({ ...prev, street: e.target.value }))}
                      className="p-3 border rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      placeholder="House Number"
                      value={addressData.houseNumber}
                      onChange={(e) => setAddressData(prev => ({ ...prev, houseNumber: e.target.value }))}
                      className="p-3 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="LGA"
                      value={addressData.lga}
                      onChange={(e) => setAddressData(prev => ({ ...prev, lga: e.target.value }))}
                      className="p-3 border rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={addressData.state}
                      onChange={(e) => setAddressData(prev => ({ ...prev, state: e.target.value }))}
                      className="p-3 border rounded-lg"
                      required
                    />
                    <div className="md:col-span-2">
                      <button type="submit" className="btn-primary w-full md:w-auto">Add Address</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
                <h2 className="text-xl font-semibold text-[#011F5B] mb-6">Change Password</h2>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <button type="submit" className="btn-primary w-full">Update Password</button>
              </form>
            )}
            
            {activeTab === 'notifications' && (
              <div className="text-gray-500">Notification settings are handled by the system automatically.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}