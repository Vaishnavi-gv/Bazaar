// import { Link } from "react-router-dom";
// import "./App.css";

// function App() {
//   return (
//     <div className="container">

//       {/* NAVBAR */}
//       <nav className="navbar">
//         <div className="logo">Bazaar</div>

//         <input
//           type="text"
//           placeholder="Search products..."
//           className="search"
//         />

//         <div className="nav-actions">
//           <Link to="/login">
//             <button className="btn-secondary">Login</button>
//           </Link>

//           <Link to="/register">
//             <button className="btn-primary">Register</button>
//           </Link>

//           <div className="cart">🛒 Cart</div>
//         </div>
//       </nav>


//       {/* HERO BANNER */}
//       <section className="hero">
//         <div className="hero-text">
//           <h1>Welcome to Bazaar</h1>
//           <p>Buy & Sell products securely with JWT authentication</p>

//           <Link to="/products">
//             <button className="btn-primary">Shop Now</button>
//           </Link>
//         </div>

//         <img
//           src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
//           alt="shopping"
//           className="hero-image"
//         />
//       </section>


//       {/* CATEGORIES */}
//       <section className="categories">
//         <h2>Shop by Category</h2>

//         <div className="category-grid">
//           <div className="category-card">Electronics</div>
//           <div className="category-card">Fashion</div>
//           <div className="category-card">Home</div>
//           <div className="category-card">Books</div>
//         </div>
//       </section>


//       {/* FEATURED PRODUCTS */}
//       <section className="products">
//         <h2>Featured Products</h2>

//         <div className="product-grid">

//           <div className="product-card">
//             <img src="https://via.placeholder.com/200" alt="" />
//             <h3>Wireless Headphones</h3>
//             <p>$79</p>
//             <button className="btn-primary">Add to Cart</button>
//           </div>

//           <div className="product-card">
//             <img src="https://via.placeholder.com/200" alt="" />
//             <h3>Smart Watch</h3>
//             <p>$120</p>
//             <button className="btn-primary">Add to Cart</button>
//           </div>

//           <div className="product-card">
//             <img src="https://via.placeholder.com/200" alt="" />
//             <h3>Gaming Mouse</h3>
//             <p>$45</p>
//             <button className="btn-primary">Add to Cart</button>
//           </div>

//         </div>
//       </section>


//       {/* FOOTER */}
//       <footer className="footer">
//         <p>© 2026 Bazaar Marketplace</p>
//       </footer>

//     </div>
//   );
// }

// export default App;



// import { Link } from "react-router-dom";
// import "./App.css";

// function App() {
//   return (
//     <div className="main-inner">
//       <section className="hero">
//             </section>
//     </div>
//   );
// }

// export default App; 

import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="container">

      <div className="hero">
        <div className="hero-text">
          <h1>Bazaar Store</h1>
          <p>Best products for you</p>
        </div>
      </div>

      <HomePage />

    </div>
  );
}

export default App;