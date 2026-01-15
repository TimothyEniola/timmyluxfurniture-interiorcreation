import { useCart } from '../context/CartContext'


export default function ProductCard({ product }) {
const { addToCart } = useCart()


return (
<div className="border rounded-xl p-4 shadow">
<img src={product.image} className="h-48 w-full object-cover rounded" />
<h3 className="mt-2 font-semibold">{product.name}</h3>
<p className="text-[#D4AF37] font-bold">₦{product.price.toLocaleString()}</p>
<button
onClick={() => addToCart(product)}
className="mt-3 w-full bg-[#0A1A2F] text-white py-2 rounded hover:bg-[#132f52]"
>
Add to Cart
</button>
</div>
)
}