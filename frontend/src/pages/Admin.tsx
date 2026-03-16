import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

interface ProductForm {
  title: string;
  description: string;
  price: string;
  category: string;
  brand: string;
  stock: string;
  images: string;
}

export default function Admin() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ProductForm>({
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    images: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    void (async () => {
      try {
        const res = await api.get("/user/admin");
        setMessage(res.data.message);
        setStatus("success");
      } catch {
        setMessage("Forbidden");
        setStatus("error");
        navigate("/login");
      }
    })();
  }, [navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStatus("");

    try {
      const payload = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        brand: form.brand,
        stock: Number(form.stock),
        images: form.images
          .split(",")
          .map((url) => url.trim())
          .filter(Boolean),
      };

      await api.post("/products", payload);

      setMessage("Product created successfully.");
      setStatus("success");
      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
        images: "",
      });
    } catch (error: unknown) {
      console.error(error);
      setMessage("Failed to create product. Please try again.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-inner admin-page">
      <header className="admin-header">
        <div>
          <h1 className="section-title">Admin dashboard</h1>
          <p className="section-subtitle">
            Create new products so the buying and selling workflow runs smoothly.
          </p>
        </div>
        {message && (
          <p
            className={`message ${
              status === "success" ? "message-success" : "message-error"
            }`}
          >
            {message}
          </p>
        )}
      </header>

      <section className="admin-grid">
        <article className="profile-card">
          <h2>Add new product</h2>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div>
              <label className="field-label" htmlFor="title">
                Product title
              </label>
              <input
                id="title"
                name="title"
                className="input-field"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="field-label" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="input-field"
                rows={3}
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-row">
              <div>
                <label className="field-label" htmlFor="price">
                  Price (₹)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  className="input-field"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="field-label" htmlFor="stock">
                  Stock
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  className="input-field"
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="admin-form-row">
              <div>
                <label className="field-label" htmlFor="category">
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  className="input-field"
                  value={form.category}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="field-label" htmlFor="brand">
                  Brand
                </label>
                <input
                  id="brand"
                  name="brand"
                  className="input-field"
                  value={form.brand}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="field-label" htmlFor="images">
                Image URLs (comma‑separated)
              </label>
              <input
                id="images"
                name="images"
                className="input-field"
                placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                value={form.images}
                onChange={handleChange}
              />
            </div>

            <div className="auth-actions">
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? "Saving..." : "Add product"}
              </button>
            </div>
          </form>
        </article>
      </section>
    </div>
  );
}
