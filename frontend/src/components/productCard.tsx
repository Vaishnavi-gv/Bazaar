import type { Product } from "../types/product";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addItem } = useCart();
  const { ids, toggle } = useWishlist();
  const isWished = ids?.has?.(product._id);

  return (
    <div className="product-card">

      <div className="product-image-wrapper">
        <button
          type="button"
          className={`wishlist-toggle ${isWished ? "wishlist-toggle-active" : ""}`}
          onClick={() => toggle(product)}
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
          title={isWished ? "Remove from wishlist" : "Add to wishlist"}
        >
          ♥
        </button>
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

      <div className="product-actions">
        <button
          className="btn-primary product-add-button"
          onClick={() => addItem(product)}
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>

        <Link to={`/product/${product._id}`} className="btn-secondary product-details-button">
          View Details
        </Link>
      </div>

    </div>
  );
};

export default ProductCard;