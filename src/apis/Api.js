import axios from "axios";

// Creating backend config
const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

const jsonConfig = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
};

// Register API
export const registerUserApi = (data) => Api.post("/api/user/create", data);

// Login API
export const loginUserApi = (data) => Api.post("/api/user/login", data);
