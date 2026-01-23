import { createContext, useContext, useState, useEffect } from "react";
import { products as initialProducts } from "../data/Products";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('timmylux-products');
    const loadedProducts = savedProducts ? JSON.parse(savedProducts) : initialProducts;
    // Ensure all products have the available field
    return loadedProducts.map(product => ({
      ...product,
      available: product.available !== undefined ? product.available : true
    }));
  });

  useEffect(() => {
    localStorage.setItem('timmylux-products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      available: product.available !== undefined ? product.available : true, // Default to available
    };
    setProducts((prev) => [...prev, newProduct]);
    return newProduct;
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleAvailability = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, available: !p.available } : p))
    );
  };

  const updateProduct = (id, updates) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        toggleAvailability,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
