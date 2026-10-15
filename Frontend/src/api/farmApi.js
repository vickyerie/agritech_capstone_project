import api from "./axios";

export const getMyFarms = () => api.get("/farms").then((res) => res.data);

export const getFarmById = (id) =>
  api.get(`/farms/${id}`).then((res) => res.data);

export const createFarm = (data) =>
  api.post("/farms", data).then((res) => res.data);

export const updateFarm = (id, data) =>
  api.put(`/farms/${id}`, data).then((res) => res.data);

export const deleteFarm = (id) =>
  api.delete(`/farms/${id}`).then((res) => res.data);
