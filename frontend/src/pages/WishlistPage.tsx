import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const WishlistPage = () => {
  const { wishlist, remove, clear } = useWishlist();
  const { addItem } = useCart();

  if (!wishlist.length) {
    return (
      <div className="main-inner">
        <h2 className="section-title">Your Wishlist</h2>
        <p className="section-subtitle">
          No items saved yet. Browse products and tap the heart icon to save them here.
        </p>
        <Link to="/" className="btn-primary">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="main-inner wishlist-page">
      <div className="wishlist-header">
        <div>
          <h2 className="section-title">Your Wishlist</h2>
          <p className="section-subtitle">Saved items you might want to buy later.</p>
        </div>
        <button className="btn-secondary" onClick={clear}>
          Clear wishlist
        </button>
      </div>

      <div className="product-grid">
        {wishlist.map((product: any) => (
          <div key={product._id} className="product-card">
            <div className="product-image-wrapper">
              <img
                src={product.images?.[0] || "https://via.placeholder.com/400x400?text=Product"}
                alt={product.title}
                className="product-image"
              />
            </div>

            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">₹{product.price}</p>
              <p className="product-meta">
                <span>{product.brand}</span>
                <span className="product-stock">
                  {product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}
                </span>
              </p>
            </div>

            <div className="wishlist-actions">
              <button
                className="btn-primary"
                onClick={() => addItem(product)}
                disabled={product.stock <= 0}
              >
                Add to Cart
              </button>
              <button className="btn-secondary" onClick={() => remove(product._id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;

