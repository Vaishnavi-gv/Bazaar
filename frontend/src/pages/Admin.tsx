import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Admin() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    void (async () => {
      try {
        const res = await api.get("/user/admin");
        setMessage(res.data.message);
      } catch {
        setMessage("Forbidden");
        navigate("/login");
      }
    })();
  }, [navigate]);

  return (
    <div className="auth-layout">
      <section className="auth-card" aria-labelledby="admin-title">
        <header>
          <h1 id="admin-title" className="auth-title">
            Admin control panel
          </h1>
          <p className="auth-subtitle">
            This route is protected by role‑based access control. Only users
            with the <strong>admin</strong> role can access it.
          </p>
        </header>

        <p
          className={`message ${
            message.toLowerCase().includes("success")
              ? "message-success"
              : "message-error"
          }`}
        >
          {message}
        </p>

        <p className="auth-footer">
          In a full e‑commerce implementation this is where you would manage
          products, orders and user accounts.
        </p>
      </section>
    </div>
  );
}
