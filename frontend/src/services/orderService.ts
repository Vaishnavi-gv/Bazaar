import type { Order, OrderStatus } from "../types/order";
import type { Product } from "../types/product";

const ORDERS_KEY = "orders";

export const getOrders = (): Order[] => {
  const raw = localStorage.getItem(ORDERS_KEY);
  return raw ? JSON.parse(raw) : [];
};

const saveOrders = (orders: Order[]) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const createOrderFromCart = (cart: (Product & { quantity: number })[]): Order => {
  const orders = getOrders();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order: Order = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: "Pending",
    items: cart.map((item) => ({
      _id: item._id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      images: item.images,
    })),
    total,
  };

  const updated = [order, ...orders];
  saveOrders(updated);

  return order;
};

export const updateOrderStatus = (id: string, status: OrderStatus) => {
  const orders = getOrders();
  const updated = orders.map((order) =>
    order.id === id ? { ...order, status } : order
  );
  saveOrders(updated);
  return updated;
};

