import api from "./axios";

export const getCropInfoList = () =>
  api.get("/crop-info").then((res) => res.data);

export const getCropInfo = (id) =>
  api.get(`/crop-info/${id}`).then((res) => res.data);
