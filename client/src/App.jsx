import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CustomRequest from "./pages/CustomRequest";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <BrowserRouter>
            <TopBar />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/custom-request" element={<CustomRequest />} />
              <Route path="/contact" element={<CustomRequest />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
