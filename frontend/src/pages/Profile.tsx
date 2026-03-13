import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="auth-layout">
      <section className="auth-card" aria-labelledby="profile-title">
        <header>
          <h1 id="profile-title" className="auth-title">
            Account overview
          </h1>
          <p className="auth-subtitle">
            This protected route is only accessible with a valid JWT from the
            login flow.
          </p>
        </header>

        <div
          style={{
            borderRadius: "1rem",
            padding: "1rem 1.1rem",
            backgroundColor: "rgba(15,23,42,0.96)",
            border: "1px solid rgba(148,163,184,0.6)",
            fontSize: "0.9rem",
            overflowX: "auto",
          }}
        >
          <pre style={{ margin: 0, color: "#e5e7eb" }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        <p className="auth-footer">
          You can extend this page with order history, saved addresses and
          payment methods as part of the full e‑commerce experience.
        </p>
      </section>
    </div>
  );
}
