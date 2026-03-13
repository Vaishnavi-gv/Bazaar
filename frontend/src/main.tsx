import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import App from "./App";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
            </nav>
          </div>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  </StrictMode>
);
