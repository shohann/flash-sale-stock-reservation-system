import type { Reservation } from "../types";

const KEY = "reservations";

export function saveReservation(r: Reservation) {
  const data: Record<string, Reservation> = getReservations();
  data[String(r.id)] = r;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getReservations(): Record<string, Reservation> {
  return JSON.parse(localStorage.getItem(KEY) || "{}");
}

export function removeReservation(id: number) {
  const data = getReservations();
  delete data[String(id)];
  localStorage.setItem(KEY, JSON.stringify(data));
}
