import api from "./axios";

export const getCropsByFarm = (farmId) =>
  api.get(`/crops/farm/${farmId}`).then((res) => res.data);

export const getCropById = (id) =>
  api.get(`/crops/${id}`).then((res) => res.data);

export const createCrop = (data) =>
  api.post("/crops", data).then((res) => res.data);

export const updateCrop = (id, data) =>
  api.put(`/crops/${id}`, data).then((res) => res.data);

export const deleteCrop = (id) =>
  api.delete(`/crops/${id}`).then((res) => res.data);
