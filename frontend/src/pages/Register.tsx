import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    try {
      const res = await api.post("/user/register", form);
      setMessage(res.data.message ?? "Registered successfully. You can now log in.");
    } catch (err: unknown) {
      const axiosErr = err as {
        response?: { data?: { message?: string }; status?: number };
        message?: string;
        code?: string;
      };
      console.error("Registration error:", axiosErr);
      setIsError(true);
      const backendMsg = axiosErr.response?.data?.message;
      if (backendMsg) {
        setMessage(backendMsg);
      } else if (axiosErr.message === "Network Error" || !axiosErr.response) {
        setMessage(
          "Network error – check backend is running on port 8000 and CORS allows localhost:5173"
        );
      } else {
        setMessage(
          `Registration failed (${axiosErr.response?.status ?? "unknown"})`
        );
      }
    }
  };

  return (
    <div className="auth-layout">
      <section className="auth-card" aria-labelledby="register-title">
        <header>
          <h1 id="register-title" className="auth-title">
            Create your Bazaar account
          </h1>
          <p className="auth-subtitle">
            Register as a buyer or seller to start trading securely.
          </p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label className="field-label" htmlFor="firstName">
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              className="input-field"
              placeholder="Enter your first name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="field-label" htmlFor="lastName">
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              className="input-field"
              placeholder="Enter your last name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="field-label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input-field"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="field-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="input-field"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-actions">
            <button type="submit" className="btn-primary">
              Sign up for Bazaar
            </button>
            <p className="auth-footer">
              Already have an account?{" "}
              <Link to="/login">Sign in instead</Link>.
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
