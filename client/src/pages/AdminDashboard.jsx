import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Package,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Upload,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { products, addProduct, toggleAvailability, deleteProduct } = useProducts();

  // Check if user is admin
  useEffect(() => {
    if (!isAdmin()) {
      navigate("/signin");
    }
  }, [isAdmin, navigate]);
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Esther Adebayo",
      product: "Luxury King Bed Frame",
      amount: 485000,
      status: "Pending",
      date: "2026-01-15",
    },
    {
      id: 2,
      customer: "Daniel Okonkwo",
      product: "Premium Velvet Sofa",
      amount: 420000,
      status: "Delivered",
      date: "2026-01-14",
    },
    {
      id: 3,
      customer: "Faith Olamide",
      product: "Elegant Dining Set",
      amount: 380000,
      status: "Pending",
      date: "2026-01-15",
    },
    {
      id: 4,
      customer: "Michael Eze",
      product: "Premium Wardrobe",
      amount: 650000,
      status: "Delivered",
      date: "2026-01-13",
    },
    {
      id: 5,
      customer: "Grace Nnamdi",
      product: "Executive Office Desk",
      amount: 385000,
      status: "Pending",
      date: "2026-01-16",
    },
    {
      id: 6,
      customer: "Samuel Ade",
      product: "Designer Bedroom Suite",
      amount: 890000,
      status: "Delivered",
      date: "2026-01-12",
    },
    {
      id: 7,
      customer: "Jennifer Bello",
      product: "Luxury Armchair",
      amount: 185000,
      status: "Cancelled",
      date: "2026-01-14",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    featured: false,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Calculate statistics
  const totalSales = orders
    .filter((o) => o.status === "Delivered")
    .reduce((sum, o) => sum + o.amount, 0);
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;
  const totalOrders = orders.length;

  // Data for charts
  const orderStatusData = [
    { name: "Pending", value: pendingOrders, color: "#fbbf24" },
    { name: "Delivered", value: deliveredOrders, color: "#D4AF37" },
    {
      name: "Cancelled",
      value: orders.filter((o) => o.status === "Cancelled").length,
      color: "#DC2626",
    },
  ];

  const salesTrendData = [
    { month: "Aug", sales: 2150000 },
    { month: "Sep", sales: 2850000 },
    { month: "Oct", sales: 3200000 },
    { month: "Nov", sales: 3650000 },
    { month: "Dec", sales: 4100000 },
    { month: "Jan", sales: 3210000 },
  ];

  const categoryData = [
    { category: "Bedroom", sales: 8, amount: 2850000 },
    { category: "Living Room", sales: 12, amount: 3450000 },
    { category: "Dining", sales: 6, amount: 1680000 },
    { category: "Office", sales: 4, amount: 1280000 },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    
    if (!newProduct.image) {
      alert("Please upload a product image");
      return;
    }

    const productToAdd = {
      ...newProduct,
      price: parseInt(newProduct.price),
    };

    addProduct(productToAdd);
    
    // Show success message
    setSuccessMessage(`Product "${newProduct.name}" added successfully!`);
    setTimeout(() => setSuccessMessage(""), 3000);

    // Reset form
    setNewProduct({
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
      featured: false,
    });
    setImagePreview(null);
  };

  const handleToggleAvailability = (productId, productName) => {
    toggleAvailability(productId);
    const product = products.find(p => p.id === productId);
    const newStatus = product.available ? 'unavailable' : 'available';
    setSuccessMessage(`Product "${productName}" marked as ${newStatus}!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleDeleteProduct = (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      deleteProduct(productId);
      setSuccessMessage(`Product "${productName}" deleted successfully!`);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="section-heading">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage your furniture store and track performance
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <CheckCircle size={20} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-[#fbbf24]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">Total Sales</h3>
              <DollarSign className="text-[#fbbf24]" size={24} />
            </div>
            <p className="text-3xl font-bold text-[#D4AF37]">
              ₦{(totalSales / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-gray-600 mt-1">+12.5% from last month</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-[#D4AF37]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">Total Orders</h3>
              <Package className="text-[#D4AF37]" size={24} />
            </div>
            <p className="text-3xl font-bold text-[#D4AF37]">{totalOrders}</p>
            <p className="text-xs  mt-1">+8% from last month</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-[#fbbf24]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">
                Pending Orders
              </h3>
              <Clock className="text-[#fbbf24]" size={24} />
            </div>
            <p className="text-3xl font-bold text-[#D4AF37]">{pendingOrders}</p>
            <p className="text-xs text-gray-500 mt-1">Awaiting delivery</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-[#D4AF37]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">Delivered</h3>
              <CheckCircle className="text-[#D4AF37]" size={24} />
            </div>
            <p className="text-3xl font-bold text-[#D4AF37]">
              {deliveredOrders}
            </p>
            <p className="text-xs text-gray-500 mt-1">Successfully completed</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Order Status Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#D4AF37] mb-6">
              Order Status Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Sales Trend Line Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#D4AF37] mb-6">
              Sales Trend (6 Months)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `₦${(value / 1000000).toFixed(1)}M`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#D4AF37"
                  strokeWidth={3}
                  name="Sales"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Performance Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
            <h2 className="text-xl font-bold text-[#011F5B] mb-6">
              Sales by Category
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis yAxisId="left" orientation="left" stroke="#011F5B" />
                <YAxis yAxisId="right" orientation="right" stroke="#D4AF37" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="sales"
                  fill="#011F5B"
                  name="Units Sold"
                />
                <Bar
                  yAxisId="right"
                  dataKey="amount"
                  fill="#D4AF37"
                  name="Revenue (₦)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Add Product Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-[#011F5B] mb-6">
            Add New Product
          </h2>
          <form onSubmit={handleAddProduct} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Luxury Sofa Set"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (₦) *
                </label>
                <input
                  type="number"
                  placeholder="450000"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Dining">Dining</option>
                  <option value="Office">Office</option>
                  <option value="Storage">Storage</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProduct.featured}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        featured: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    Feature on Homepage
                  </span>
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Brief description of the product"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  rows="2"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Image *
              </label>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or WEBP (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                {imagePreview && (
                  <div className="flex-1">
                    <div className="relative h-48 border-2 border-gray-300 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setNewProduct({ ...newProduct, image: "" });
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>
                    <p className="text-sm text-green-600 mt-2 text-center">
                      Image ready to upload
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="btn-secondary w-full text-white">
              <span className="flex items-center justify-center gap-2">
                <Package size={20} />
                Add Product to Store
              </span>
            </button>
          </form>
        </div>

        {/* Products Management Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-[#D4AF37]">Manage Products</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#D4AF37]">
                      ₦{product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.available ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Available
                        </span>
                      ) : (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Unavailable
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleAvailability(product.id, product.name)}
                          className={`text-sm font-medium px-3 py-1 rounded transition-colors ${
                            product.available
                              ? 'text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100'
                              : 'text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100'
                          }`}
                          title={product.available ? "Mark as unavailable" : "Mark as available"}
                        >
                          {product.available ? "Mark Unavailable" : "Mark Available"}
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id, product.name)}
                          className="text-red-600 hover:text-red-800 transition-colors p-2 rounded hover:bg-red-50"
                          title="Delete product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-[#D4AF37]">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#D4AF37]">
                      ₦{order.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
