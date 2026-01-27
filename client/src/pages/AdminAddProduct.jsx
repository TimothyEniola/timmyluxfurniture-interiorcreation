import { useState } from "react";
import { useProductStore } from "../store/productStore";
import { useNavigate } from "react-router-dom";
import { Upload, XCircle } from "lucide-react";

export default function AdminAddProduct() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    description: '',
    featured: false,
    available: true
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        ...formData,
        price: parseFloat(formData.price)
      });
      navigate('/admin/products');
    } catch (error) {
      alert("Failed to add product");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        setIsUploading(false);
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        setIsUploading(false);
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

return (
    <div className="container-custom py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#011F5B] mb-8">Add New Product</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
           {/* ... (Keep existing form fields) ... */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name, Category, Price, Image, Description fields... */}
            {/* Copy them exactly from your provided file content */}
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border rounded-lg" required>
                 <option value="">Select Category</option>
                 <option value="Living Room">Living Room</option>
                 <option value="Bedroom">Bedroom</option>
                 <option value="Dining">Dining</option> {/* Match your Enum */}
                 <option value="Office">Office</option>
                 <option value="Storage">Storage</option>
              </select>
            </div>
            {/* ... Price ... */}
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₦)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-3 border rounded-lg" min="0" step="0.01" required />
            </div>
            {/* ... Image ... */}
            {/* ... Description ... */}
           </div>
           
          <div className="mt-8 flex gap-4">
            <button type="submit" className="btn-primary flex-1" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Product"}
            </button>
            <button type="button" onClick={() => navigate('/admin/products')} className="btn-secondary flex-1 text-white">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}