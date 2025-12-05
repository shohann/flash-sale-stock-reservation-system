export interface Product {
  id: number;
  name: string;
  price: number;
  available_stock: number;
}

// export interface Reservation {
//   id: number;
//   productId: number;
//   quantity: number;
//   status: "ACTIVE" | "EXPIRED" | "COMPLETED";
//   expiresAt: string; // ISO timestamp
// }

export interface Reservation {
  id: number;
  product_id: number; // 👈 backend field
  status: "Active" | "Expired" | "Completed";
  createdAt: string;
  expiredAt: string; // 👈 backend field
}
