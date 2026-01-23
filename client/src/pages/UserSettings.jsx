import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Lock, Bell, Shield, Camera } from "lucide-react";

export default function UserSettings() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
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
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    orderUpdates: true,
    promotionalEmails: false,
  });

  if (!user) {
    return (
      <div className="container-custom py-8">
        <div className="text-center">
          <p className="text-gray-500">Please sign in to access settings.</p>
        </div>
      </div>
    );
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateUser(formData);
    alert('Profile updated successfully!');
  };

  const handleAddressUpdate = (e) => {
    e.preventDefault();
    // For now, add to addresses array
    const newAddress = {
      street: addressData.street,
      lga: addressData.lga,
      state: addressData.state,
      houseNumber: addressData.houseNumber,
    };
    updateUser({ addresses: [...(user.addresses || []), newAddress] });
    setAddressData({ street: '', lga: '', state: '', houseNumber: '' });
    alert('Address added successfully!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // In a real app, this would call an API
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        setIsUploading(false);
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB.');
        setIsUploading(false);
        return;
      }
      
      // Create a FileReader to read the image
      const reader = new FileReader();
      reader.onload = (e) => {
        // In a real app, you would upload to a server here
        // For now, we'll use the data URL directly
        updateUser({ profileImage: e.target.result });
        setIsUploading(false);
        alert('Profile image updated successfully!');
      };
      reader.readAsDataURL(file);
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
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm ${
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
                <h2 className="text-xl font-semibold text-[#011F5B] mb-6">Personal Information</h2>

                {/* Profile Image Section */}
                <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-lg">
                  <div className="relative">
                    <div className="w-20 h-20 bg-[#011F5B] rounded-full flex items-center justify-center overflow-hidden">
                      {user?.profileImage ? (
                        <img 
                          src={user.profileImage} 
                          alt={user.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={32} className="text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#011F5B] mb-2">Profile Picture</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Upload a new profile picture. Max size: 5MB. Supported formats: JPG, PNG, GIF.
                    </p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8952A] transition-colors cursor-pointer disabled:opacity-50">
                      <Camera size={16} />
                      {isUploading ? 'Uploading...' : 'Change Picture'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <form onSubmit={handleProfileUpdate} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </form>

              {/* Addresses Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-[#011F5B] mb-4">Addresses</h3>
                <form onSubmit={handleAddressUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Name
                      </label>
                      <input
                        type="text"
                        value={addressData.street}
                        onChange={(e) => setAddressData(prev => ({ ...prev, street: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                        placeholder="Enter street name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LGA
                      </label>
                      <input
                        type="text"
                        value={addressData.lga}
                        onChange={(e) => setAddressData(prev => ({ ...prev, lga: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                        placeholder="Enter LGA"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={addressData.state}
                        onChange={(e) => setAddressData(prev => ({ ...prev, state: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                        placeholder="Enter state"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        House Number
                      </label>
                      <input
                        type="text"
                        value={addressData.houseNumber}
                        onChange={(e) => setAddressData(prev => ({ ...prev, houseNumber: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                        placeholder="Enter house number"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary">
                    Add Address
                  </button>
                </form>
              </div>
            </div>
            )}

            {activeTab === 'security' && (
              <form onSubmit={handlePasswordChange} className="space-y-6">
                <h2 className="text-xl font-semibold text-[#011F5B] mb-6">Change Password</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary">
                  Change Password
                </button>
              </form>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[#011F5B] mb-6">Notification Preferences</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium text-[#011F5B]">Email Updates</h3>
                      <p className="text-sm text-gray-600">Receive updates about your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.emailUpdates}
                        onChange={() => handleNotificationChange('emailUpdates')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium text-[#011F5B]">Order Updates</h3>
                      <p className="text-sm text-gray-600">Get notified about order status changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.orderUpdates}
                        onChange={() => handleNotificationChange('orderUpdates')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium text-[#011F5B]">Promotional Emails</h3>
                      <p className="text-sm text-gray-600">Receive offers and promotions</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.promotionalEmails}
                        onChange={() => handleNotificationChange('promotionalEmails')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => alert('Notification preferences saved!')}
                  className="btn-primary"
                >
                  Save Preferences
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}