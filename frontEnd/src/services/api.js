const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://6a8821adf273188e4d6c9fbb-api-capstone.myanatomy.ai/api/v1";

const request = async (path, { method = "GET", body, token } = {}) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

export default request;