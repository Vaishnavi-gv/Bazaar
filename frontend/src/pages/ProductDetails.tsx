import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import type { Product } from "../types/product";

const ProductDetails = () => {

  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const data = await getProductById(id!);
    setProduct(data);
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div>

      <img
        src={product.images?.[0] || "https://via.placeholder.com/300"}
        width="300"
      />

      <h1>{product.title}</h1>

      <p>{product.description}</p>

      <h2>₹{product.price}</h2>

      <button>Add to Cart</button>

    </div>
  );
};

export default ProductDetails;