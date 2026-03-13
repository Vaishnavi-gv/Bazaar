// import { useEffect, useState } from "react";
// import { getProducts } from "../services/productService";
// import type { Product } from "../types/product";
// import ProductCard from "../components/productCard";

// const HomePage = () => {

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const data = await getProducts();
//       setProducts(data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <h2>Loading products...</h2>;

//   return (
//     <div>

//       <h1>All Products</h1>

//       <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"20px"}}>

//         {products.map((product) => (
//           <ProductCard
//             key={product._id}
//             product={product}
//           />
//         ))}

//       </div>

//     </div>
//   );
// };

// export default HomePage;
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import type { Product } from "../types/product";
import ProductCard from "../components/productCard";

const HomePage = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="products">
      <h2>All Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

    </div>
  );
};

export default HomePage;