import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrderFromCart } from "../services/orderService";
import api from "../api";

const CartPage = () => {
  const { cart, removeItem, clear } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const loadRazorpayScript = () =>
    new Promise<boolean>((resolve, reject) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject();
      document.body.appendChild(script);
    });

  const handlePlaceOrder = async () => {
    if (!cart.length) return;

    try {
      const ok = await loadRazorpayScript();
      if (!ok) {
        alert("Failed to load payment gateway. Please try again.");
        return;
      }

      const { data } = await api.post("/payments/create-order", {
        amount: total,
      });

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Bazaar",
        description: "Order payment",
        order_id: data.orderId,
        handler: () => {
          createOrderFromCart(cart);
          clear();
          navigate("/orders");
        },
        prefill: {},
        notes: {},
        theme: {
          color: "#0ea5e9",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Unable to start payment. Please try again.");
    }
  };

  return (
    <div className="main-inner cart-page">

      <h2 className="section-title">Your Cart</h2>

      {cart.length === 0 && (
        <p className="cart-empty">
          Your cart is empty. Go back to the home page and add some products.
        </p>
      )}

      {cart.length > 0 && (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item: any) => (
              <div key={item._id} className="cart-item">

                <div className="cart-item-image-wrapper">
                  <img
                    src={item.images?.[0] || "https://via.placeholder.com/120x120?text=Product"}
                    alt={item.title}
                    className="cart-item-image"
                  />
                </div>

                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-meta">
                    <span>Price: ₹{item.price}</span>
                    <span>Quantity: {item.quantity}</span>
                  </p>
                </div>

                <div className="cart-item-actions">
                  <p className="cart-item-line-total">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="btn-secondary cart-item-remove"
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>

          <aside className="cart-summary-card">
            <h3>Order Summary</h3>
            <p className="cart-summary-row">
              <span>Items</span>
              <span>{cart.length}</span>
            </p>
            <p className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>₹{total}</span>
            </p>
            <button
              className="btn-primary cart-checkout-button"
              onClick={handlePlaceOrder}
              disabled={!cart.length}
            >
              Place Order
            </button>
          </aside>
        </div>
      )}

    </div>
  );
};

export default CartPage;