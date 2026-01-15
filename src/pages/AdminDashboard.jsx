// export default function AdminDashboard() {
// return (
// <div className="p-6 grid md:grid-cols-4 gap-6">
// <aside className="bg-[#0A1A2F] text-white p-4 rounded">
// <p className="font-bold mb-2">Admin Panel</p>
// <ul className="space-y-2">
// <li>Add Product</li>
// <li>View Orders</li>
// <li>Analytics</li>
// </ul>
// </aside>
// <main className="md:col-span-3">
// <h1 className="text-xl font-bold">Dashboard Overview</h1>
// <p className="mt-2">Orders and product uploads appear here.</p>
// </main>
// </div>
// )
// }


// ==========================
// pages/AdminDashboard.jsx (Full Functional Version)
// ==========================
import { useState } from 'react'

export default function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([
    { id: 1, customer: 'Esther A.', product: 'Luxury Bed Frame', status: 'Pending' },
    { id: 2, customer: 'Daniel K.', product: 'Modern Sofa', status: 'Delivered' },
  ])

  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' })

  const handleAddProduct = (e) => {
    e.preventDefault()
    const id = products.length + 1
    setProducts([...products, { ...newProduct, id }])
    setNewProduct({ name: '', price: '', image: '' })
  }

  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      {/* Sidebar */}
      <aside className="bg-[#0A1A2F] text-white w-full md:w-64 p-6">
        <h2 className="font-bold text-xl mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="hover:text-[#D4AF37] cursor-pointer">Add Product</li>
          <li className="hover:text-[#D4AF37] cursor-pointer">View Orders</li>
          <li className="hover:text-[#D4AF37] cursor-pointer">Analytics</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Total Sales</h3>
            <p className="text-[#D4AF37] font-bold text-2xl">₦1,080,000</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Orders</h3>
            <p className="text-[#D4AF37] font-bold text-2xl">{orders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Pending Deliveries</h3>
            <p className="text-[#D4AF37] font-bold text-2xl">{orders.filter(o => o.status === 'Pending').length}</p>
          </div>
        </div>

        {/* Add Product Form */}
        <section className="bg-white p-6 rounded-xl shadow mb-12">
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="grid gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <button className="bg-[#D4AF37] text-[#0A1A2F] py-2 rounded font-semibold hover:bg-[#c49b2e] transition">Add Product</button>
          </form>
        </section>

        {/* Product List */}
        {products.length > 0 && (
          <section className="bg-white p-6 rounded-xl shadow mb-12">
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <ul className="space-y-2">
              {products.map(p => (
                <li key={p.id} className="flex justify-between border-b pb-2">
                  <span>{p.name}</span>
                  <span>₦{p.price}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Orders Table */}
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">Customer</th>
                <th className="p-2">Product</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{order.customer}</td>
                  <td className="p-2">{order.product}</td>
                  <td className="p-2 font-semibold text-[#D4AF37]">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  )
}
