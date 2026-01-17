import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'


export default function Cart() {
const { cart, removeFromCart } = useCart()


return (
<div className="p-6">
<h1 className="text-2xl font-bold mb-4">Your Cart</h1>
{cart.map(item => (
<div key={item.id} className="flex justify-between mb-3">
<span>{item.name} x{item.qty}</span>
<button onClick={() => removeFromCart(item.id)} className="text-red-600">Remove</button>
</div>
))}
<Link to="/checkout" className="inline-block mt-4 bg-[#D4AF37] px-6 py-2 rounded">Checkout</Link>
</div>
)
}