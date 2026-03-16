import type { Product } from "../types/product";

const WISHLIST_KEY = "wishlist";

export const getWishlist = (): Product[] => {
  const raw = localStorage.getItem(WISHLIST_KEY);
  return raw ? JSON.parse(raw) : [];
};

const saveWishlist = (items: Product[]) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
};

export const isInWishlist = (productId: string) => {
  return getWishlist().some((p) => p._id === productId);
};

export const addToWishlist = (product: Product) => {
  const items = getWishlist();
  if (items.some((p) => p._id === product._id)) return;
  saveWishlist([product, ...items]);
};

export const removeFromWishlist = (productId: string) => {
  const items = getWishlist().filter((p) => p._id !== productId);
  saveWishlist(items);
};

export const clearWishlist = () => {
  saveWishlist([]);
};

