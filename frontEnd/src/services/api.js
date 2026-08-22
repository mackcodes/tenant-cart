const BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://6a8821adf273188e4d6c9fbb-api-capstone.myanatomy.ai/api/v1";

const request = async (
  path,
  {
    method = "GET",
    body,
    token,
  } = {}
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data;

  try {
    data = await response.json();
  } catch (error) {
    data = {
      message: "Server returned an invalid response",
    };
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
      `Request failed with status ${response.status}`
    );
  }

  return data;
};

export default request;