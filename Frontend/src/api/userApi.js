import api from "./axios";

export const updateProfile = (data) =>
  api.put("/users/profile", data).then((res) => res.data);

export const changePassword = (data) =>
  api.put("/users/change-password", data).then((res) => res.data);
