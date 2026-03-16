import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import type { Product } from "../types/product";
import ProductCard from "../components/productCard";
import { useCart } from "../context/CartContext";

const HomePage = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const { cart } = useCart();

  const cartItemsCount = cart.reduce(
    (sum: number, item: any) => sum + (item.quantity || 1),
    0
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const pageProducts = filteredProducts.slice(startIdx, startIdx + pageSize);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="main-inner">
      <div className="products-header">
        <div>
          <h2 className="section-title">Browse Products</h2>
          <p className="section-subtitle">
            Explore all items available in your Bazaar store and add them to your cart.
          </p>
        </div>

        <Link to="/cart" className="cart-summary">
          <span className="cart-summary-label">Go to Cart</span>
          <span className="cart-summary-count">
            {cartItemsCount} item{cartItemsCount === 1 ? "" : "s"}
          </span>
        </Link>
      </div>

      <div className="products-filters">
        <input
          type="search"
          className="input-field products-search"
          placeholder="Search by product or brand…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="input-field products-select"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All categories" : cat}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {pageProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="pagination">
        <button
          className="btn-secondary"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={currentPage <= 1}
        >
          Prev
        </button>
        <span className="pagination-label">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn-secondary"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default HomePage;