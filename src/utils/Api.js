//const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://my-json-server.typicode.com/frankieag10/se_project_react";

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
};

function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

const addItem = ({ name, imageUrl, weather }) => {
  return request(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
};

const removeItem = (id) => {
  return request(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: { "content-Type": "application/json" },
  });
};

const getItemList = () => {
  return request(`${BASE_URL}/items`, {
    headers: {
      "content-Type": "application/json",
    },
  });
};

const api = { addItem, removeItem, getItemList };

export default api;
