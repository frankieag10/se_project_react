import { handleServerResponse, request } from "../utils/Api";
const baseUrl = "http://localhost:3001";

const signupUser = ({ name, avatar, email, password }) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

const signinUser = ({ email, password }) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

const updateUser = ({ name, avatar }, token) => {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};

const checkToken = (token) => {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

const auth = { signupUser, signinUser, updateUser, checkToken };

export default auth;
