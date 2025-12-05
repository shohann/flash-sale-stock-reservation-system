export interface Product {
  id: number;
  name: string;
  price: number;
  available_stock: number;
}

export interface Reservation {
  id: number;
  product_id: number;
  status: "Active" | "Expired" | "Completed";
  createdAt: string;
  expiredAt: string;
}
