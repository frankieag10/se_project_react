const baseUrl = process.env.NODE_ENV === "production" ? "https://api.frankieswtwr.crabdance.com" : "http://localhost:3001";

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
};

export function request(url, options) {
  console.log(`Sending request to: ${url}`);
  return fetch(url, options).then(handleServerResponse);
}

const addItem = ({ name, imageUrl, weather }, token) => {
  console.log("Adding a new item...");
  return request(`${baseUrl}/items`, {
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
  console.log(`Removing item with ID: ${id}`);
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
};

const addItemLike = (id, token) => {
  console.log(`Adding a like to item with ID: ${id}`);
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
};

const removeItemLike = (id, token) => {
  console.log(`Removing like from item with ID: ${id}`);
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
};

const getItemList = () => {
  console.log("Fetching item list...");
  return request(`${baseUrl}/items`, {
    headers: {
      "content-Type": "application/json",
    },
  });
};

const api = { addItem, removeItem, getItemList, addItemLike, removeItemLike };

export default api;
