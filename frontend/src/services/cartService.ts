import type { Product } from "../types/product";

const CART_KEY = "cart";

export const getCart = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: any) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (product: Product) => {
  const cart = getCart();

  const existing = cart.find((item: any) => item._id === product._id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart(cart);
};

export const removeFromCart = (id: string) => {
  const cart = getCart().filter((item: any) => item._id !== id);
  saveCart(cart);
};

export const updateQuantity = (id: string, quantity: number) => {
  const cart = getCart();

  const item = cart.find((i: any) => i._id === id);

  if (item) {
    item.quantity = quantity;
  }

  saveCart(cart);
};

export const clearCart = () => {
  saveCart([]);
};