import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    try {
      const res = await api.post("/user/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("Login successful");
      navigate("/");
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setIsError(true);
      setMessage(axiosErr.response?.data?.message ?? "Login failed");
    }
  };

  return (
    <div className="auth-layout">
      <section className="auth-card" aria-labelledby="login-title">
        <header>
          <h1 id="login-title" className="auth-title">
            Sign in to Bazaar
          </h1>
          <p className="auth-subtitle">
            Access your marketplace dashboard with secure JWT‑based sessions.
          </p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label className="field-label" htmlFor="login-email">
              Email address
            </label>
            <input
              id="login-email"
              className="input-field"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="field-label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              className="input-field"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="auth-actions">
            <button type="submit" className="btn-primary">
              Continue to dashboard
            </button>
            <p className="auth-footer">
              New to Bazaar? <Link to="/register">Create an account</Link>.
            </p>
          </div>
        </form>

        {message && (
          <p
            className={`message ${
              isError ? "message-error" : "message-success"
            }`}
          >
            {message}
          </p>
        )}
      </section>
    </div>
  );
}
