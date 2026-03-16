import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "../types/product";
import {
  addToWishlist,
  clearWishlist,
  getWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

const WishlistContext = createContext<any>(null);

export const WishlistProvider = ({ children }: any) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const refresh = () => setWishlist(getWishlist());

  useEffect(() => {
    refresh();
  }, []);

  const ids = useMemo(() => new Set(wishlist.map((p) => p._id)), [wishlist]);

  const toggle = (product: Product) => {
    if (ids.has(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
    refresh();
  };

  const remove = (productId: string) => {
    removeFromWishlist(productId);
    refresh();
  };

  const clear = () => {
    clearWishlist();
    refresh();
  };

  return (
    <WishlistContext.Provider value={{ wishlist, ids, toggle, remove, clear }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

