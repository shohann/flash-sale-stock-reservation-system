import { useEffect, useState, useCallback } from "react";
import { api } from "../api/api";
import Timer from "./Timer";
import { saveReservation, getReservations, removeReservation } from "../utils/storage";
import type { Product, Reservation } from "../types";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [reservations, setReservations] = useState<Record<string, Reservation>>(getReservations());

  const loadProducts = useCallback(async () => {
    const res = await api.get<Product[]>("/products");
    setProducts(res.data);
  }, []);

  const reserve = useCallback(async (productId: number) => {
    try {
      const res = await api.post<Reservation>("/reservations", { productId, quantity: 1 });
      const reservation = res.data;

      saveReservation(reservation);
      setReservations(getReservations());

      loadProducts();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      alert("Failed to reserve product");
    }
  }, [loadProducts]);

  const complete = useCallback(async (reservationId: number) => {
    try {
      await api.post(`/reservations/${reservationId}/complete`);

      removeReservation(reservationId);
      setReservations(getReservations());
      loadProducts();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) { 
      alert("Failed to complete");
    }
  }, [loadProducts]);


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
  const interval = setInterval(() => {
    const current = getReservations();
    let changed = false;

    for (const [id, r] of Object.entries(current)) {
      const expired = new Date(r.expiredAt).getTime() <= Date.now();
      if (expired) {
        removeReservation(Number(id));
        changed = true;
      }
    }

    if (changed) {
      setReservations(getReservations());
      loadProducts(); 
    }
  }, 1000);

  return () => clearInterval(interval);
}, [loadProducts]);
  

  return (
    <div>
      <h2>Products</h2>
      {products.map((p) => {
        const reservation = Object.values(reservations).find(
          (r) => r.product_id === p.id
        );

        return (
          <div key={p.id} style={{ marginBottom: "20px" }}>
            <div><h3>Product: {p.name}</h3></div>
            <div>Stock: {p.available_stock}</div>
            <div>Price: {p.price}</div>

            {!reservation && (
              <button onClick={() => reserve(p.id)}>Reserve</button>
            )}

            {reservation && (
              <>
                <Timer expiresAt={reservation.expiredAt} />
                <button onClick={() => complete(reservation.id)}>Purchase</button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}