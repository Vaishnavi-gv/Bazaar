import type { Product } from "../types/product";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="product-card">

      <img
        src={product.images?.[0] || "https://via.placeholder.com/200"}
        alt={product.title}
        width="200"
      />

      <h3>{product.title}</h3>

      <p>₹{product.price}</p>

      <Link to={`/product/${product._id}`}>
        View Details
      </Link>

    </div>
  );
};

export default ProductCard;