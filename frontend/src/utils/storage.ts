// import type { Reservation } from "../types";

// const KEY = "reservations";

// export function saveReservation(r: Reservation) {
//   const data: Record<string, Reservation> = getReservations();
//   data[r.id] = r;
//   localStorage.setItem(KEY, JSON.stringify(data));
// }

// export function getReservations(): Record<string, Reservation> {
//   return JSON.parse(localStorage.getItem(KEY) || "{}");
// }

// export function removeReservation(id: number) {
//   const data = getReservations();
//   delete data[id];
//   localStorage.setItem(KEY, JSON.stringify(data));
// }

import type { Reservation } from "../types";

const KEY = "reservations";

export function saveReservation(r: Reservation) {
  const data: Record<string, Reservation> = getReservations();
  data[String(r.id)] = r; // <-- always store as string key
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getReservations(): Record<string, Reservation> {
  return JSON.parse(localStorage.getItem(KEY) || "{}");
}

export function removeReservation(id: number) {
  const data = getReservations();
  delete data[String(id)]; // <-- delete using string key
  localStorage.setItem(KEY, JSON.stringify(data));
}
