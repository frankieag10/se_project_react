//const baseUrl = "https://my-json-server.typicode.com/frankieag10/se_project_react";
const baseUrl = "http://localhost:3001";

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
};

function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

const addItem = ({ name, imageUrl, weather }, token) => {
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
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
};

const getItemList = () => {
  return request(`${baseUrl}/items`, {
    headers: {
      "content-Type": "application/json",
    },
  });
};

const api = { addItem, removeItem, getItemList };

export default api;
