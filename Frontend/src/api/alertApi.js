import api from "./axios";

export const getMyAlerts = () => api.get("/alerts/my").then((res) => res.data);

export const getAlertsByCrop = (cropId) =>
  api.get(`/alerts/crop/${cropId}`).then((res) => res.data);

export const getAllAlerts = () =>
  api.get("/alerts/all").then((res) => res.data);

export const createAlert = (data) =>
  api.post("/alerts", data).then((res) => res.data);

export const updateAlert = (id, data) =>
  api.put(`/alerts/${id}`, data).then((res) => res.data);

export const resolveAlert = (id) =>
  api.put(`/alerts/${id}/resolve`).then((res) => res.data);

export const deleteAlert = (id) =>
  api.delete(`/alerts/${id}`).then((res) => res.data);
