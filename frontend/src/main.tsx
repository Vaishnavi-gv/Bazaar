import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import HomePage from "./pages/HomePage";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import { WishlistProvider } from "./context/WishlistContext";
import WishlistPage from "./pages/WishlistPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <div className="app-shell">
            <header className="navbar">
              <div className="navbar-inner">
                <Link to="/" className="navbar-brand">
                  <span className="navbar-logo">Bz</span>
                  <span>
                    <span className="navbar-title">Bazaar</span>
                    <br />
                    <span className="navbar-subtitle">
                      Final year e‑commerce backend
                    </span>
                  </span>
                </Link>
                <nav className="navbar-links" aria-label="Main navigation">
                  <Link to="/register" className="navbar-link">
                    Register
                  </Link>
                  <Link to="/login" className="navbar-link">
                    Login
                  </Link>
                  <Link to="/profile" className="navbar-link">
                    Profile
                  </Link>
                  <Link to="/admin" className="navbar-link-primary navbar-link">
                    Admin
                  </Link>
                  <Link to="/orders" className="navbar-link">
                    Orders
                  </Link>
                  <Link to="/wishlist" className="navbar-link">
                    Wishlist
                  </Link>
                  <Link to="/cart" className="navbar-link">
                    Cart
                  </Link>
                </nav>
              </div>
            </header>
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  </StrictMode>
);
