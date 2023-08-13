//const baseUrl = "https://my-json-server.typicode.com/frankieag10/se_project_react";

/*const baseUrl = "http://localhost:3001";

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
};

function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

const addItem = ({ name, imageURL, weather }) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      imageURL,
      weather,
    }),
  });
};

const removeItem = (id) => {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};

const getItemList = () => {
  return request(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const api = { addItem, removeItem, getItemList };

export default api;
*/

const baseUrl = "http://localhost:3001";

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
};

function request(url, options, error) {
  console.error(error);
  const token = localStorage.getItem("jwt");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return fetch(url, { ...options, headers }).then(handleServerResponse);
}

const addItem = ({ name, imageUrl, weather }) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
};

const removeItem = (id) => {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
};

const getItemList = () => {
  return request(`${baseUrl}/items`);
};

const api = { addItem, removeItem, getItemList };

export default api;
