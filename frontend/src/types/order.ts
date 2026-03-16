export type OrderStatus = "Pending" | "Processing" | "Completed" | "Cancelled";

export interface OrderItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  images?: string[];
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
}

