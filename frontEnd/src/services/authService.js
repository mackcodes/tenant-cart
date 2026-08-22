import request from "./api.js";

export const registerAccount = (payload) => {
  return request("/auth/register-account", {
    method: "POST",
    body: payload,
  });
};

export const registerStore = (
  payload,
  token
) => {
  return request("/auth/register-store", {
    method: "POST",
    body: payload,
    token,
  });
};

export const login = (payload) => {
  return request("/auth/login", {
    method: "POST",
    body: payload,
  });
};