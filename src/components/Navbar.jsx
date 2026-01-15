import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

import logo from '../assets/logo.jpeg'
export default function Navbar() {
const { cart } = useCart()


return (
<nav className="bg-[#0A1A2F] text-white px-6 py-4 flex justify-between items-center">
<Link to="/"><img src={logo} alt="Timmy Luxe Comfort" className="h-10" /></Link>
<div className="flex gap-6">
<Link to="/products">Products</Link>
<Link to="/cart">Cart ({cart.length})</Link>
<Link to="/admin">Admin</Link>
</div>
</nav>
)
}