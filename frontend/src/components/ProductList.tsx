import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "./productCard";

const ProductList = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  return (
    <div style={{
      display:"grid",
      gridTemplateColumns:"repeat(4,1fr)",
      gap:"20px"
    }}>

      {products.map((product:any)=>(
        <ProductCard key={product._id} product={product}/>
      ))}

    </div>
  );
};

export default ProductList;