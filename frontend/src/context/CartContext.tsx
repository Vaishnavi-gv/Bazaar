import { createContext, useContext, useState, useEffect } from "react";
import { getCart, addToCart, removeFromCart, clearCart } from "../services/cartService";
import type { Product } from "../types/product";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {

  const [cart, setCart] = useState<any[]>([]);

  const refreshCart = () => {
    setCart(getCart());
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addItem = (product: Product) => {
    addToCart(product);
    refreshCart();
  };

  const removeItem = (id: string) => {
    removeFromCart(id);
    refreshCart();
  };

  const clear = () => {
    clearCart();
    refreshCart();
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);