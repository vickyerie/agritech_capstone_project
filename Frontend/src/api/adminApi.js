import api from "./axios";

export const getDashboardStats = () =>
  api.get("/admin/stats").then((res) => res.data);

export const getUsers = () => api.get("/users").then((res) => res.data);

export const getAllCrops = () => api.get("/crops").then((res) => res.data);
