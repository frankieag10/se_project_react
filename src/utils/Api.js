const baseUrl = process.env.NODE_ENV === "production" ? "https://api.frankieswtwr.crabdance.com/" : "http://localhost:3001";

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
};

export function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

const addItem = ({ name, imageUrl, weather }, token) => {
  return request(`${baseUrl}items`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
};

const removeItem = (id, token) => {
  return request(`${baseUrl}items/${id}`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
};

const addItemLike = (id, token) => {
  return request(`${baseUrl}items/${id}/likes`, {
    method: "PUT",
    headers: {
      "content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
};

const removeItemLike = (id, token) => {
  return request(`${baseUrl}items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
};

const getItemList = () => {
  return request(`${baseUrl}items`, {
    headers: {
      "content-Type": "application/json",
    },
  });
};

const api = { addItem, removeItem, getItemList, addItemLike, removeItemLike };

export default api;
