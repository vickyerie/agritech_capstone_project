import api from "./axios";

export const createBooking = (data) =>
  api.post("/bookings", data).then((res) => res.data);

export const getMyBookings = () =>
  api.get("/bookings/my").then((res) => res.data);

// Admin only (dipakai di Admin dashboard nanti)
export const getAllBookings = () =>
  api.get("/bookings").then((res) => res.data);

export const updateBookingStatus = (id, status) =>
  api.put(`/bookings/${id}/status`, { status }).then((res) => res.data);
