import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../services/orderService";
import type { Order, OrderStatus } from "../types/order";

const statusOptions: OrderStatus[] = ["Pending", "Processing", "Completed", "Cancelled"];

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const handleStatusChange = (id: string, status: OrderStatus) => {
    const updated = updateOrderStatus(id, status);
    setOrders(updated);
  };

  if (!orders.length) {
    return (
      <div className="main-inner">
        <h2 className="section-title">Your Orders</h2>
        <p className="section-subtitle">
          You have not placed any orders yet. Add items to your cart and place an order to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="main-inner orders-page">
      <h2 className="section-title">Your Orders</h2>
      <p className="section-subtitle">
        View the orders you&apos;ve placed and track their status.
      </p>

      <div className="orders-list">
        {orders.map((order) => (
          <section key={order.id} className="order-card">
            <header className="order-card-header">
              <div>
                <h3>Order #{order.id}</h3>
                <p>
                  Placed on{" "}
                  {new Date(order.createdAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              <div className="order-status">
                <label htmlFor={`status-${order.id}`}>Status</label>
                <select
                  id={`status-${order.id}`}
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value as OrderStatus)
                  }
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </header>

            <div className="order-items">
              {order.items.map((item) => (
                <div key={item._id} className="order-item">
                  <div className="order-item-image-wrapper">
                    <img
                      src={item.images?.[0] || "https://via.placeholder.com/72x72?text=Product"}
                      alt={item.title}
                      className="order-item-image"
                    />
                  </div>
                  <div className="order-item-info">
                    <h4>{item.title}</h4>
                    <p>
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                  <div className="order-item-total">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <footer className="order-card-footer">
              <span>Total</span>
              <span>₹{order.total}</span>
            </footer>
          </section>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;

