import request from "./api.js";

export const registerAccount = (payload) =>
  request("/auth/register-account", { method: "POST", body: payload });

export const registerStore = (payload, token) =>
  request("/auth/register-store", { method: "POST", body: payload, token });

export const login = (payload) =>
  request("/auth/login", { method: "POST", body: payload });