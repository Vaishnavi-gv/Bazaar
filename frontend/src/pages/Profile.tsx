import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    void (async () => {
      try {
        const res = await api.get("/user/me");
        setUser(res.data.user);
      } catch {
        setMessage("Not authorized");
        navigate("/login");
      }
    })();
  }, [navigate]);

  if (message) return <p>{message}</p>;
  if (!user) return <p className="auth-footer">Loading your profile...</p>;

  const initials =
    (user.firstName?.[0] || "").toUpperCase() +
    (user.lastName?.[0] || "").toUpperCase();

  return (
    <div className="main-inner profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <span>{initials}</span>
        </div>
        <div>
          <h1 className="section-title">
            {user.firstName} {user.lastName}
          </h1>
          <p className="section-subtitle">
            {user.role === "admin" ? "Admin account" : "Customer account"} for your Bazaar store.
          </p>
        </div>
      </div>

      <section className="profile-grid">
        <article className="profile-card">
          <h2>Account details</h2>
          <dl className="profile-details">
            <div>
              <dt>Name</dt>
              <dd>
                {user.firstName} {user.lastName}
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{user.role}</dd>
            </div>
          </dl>
        </article>

        <article className="profile-card">
          <h2>{user.role === "admin" ? "Admin shortcuts" : "Shopping shortcuts"}</h2>
          <p className="profile-card-text">
            {user.role === "admin"
              ? "Quickly jump to the admin dashboard, active cart, orders, or back to browsing products."
              : "Quickly jump to your active cart, recent orders, or back to browsing products."}
          </p>
          <div className="profile-links">
            <Link to="/" className="btn-secondary">
              Browse products
            </Link>
            <Link to="/cart" className="btn-primary">
              View cart
            </Link>
            <Link to="/orders" className="btn-secondary">
              View orders
            </Link>
            {user.role !== "admin" && (
              <Link to="/wishlist" className="btn-secondary">
                Wishlist
              </Link>
            )}
            {user.role === "admin" && (
              <Link to="/admin" className="btn-secondary">
                Admin dashboard
              </Link>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
