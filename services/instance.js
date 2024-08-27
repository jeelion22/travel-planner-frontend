import axios from "axios";

const baseURL = "https://travel-planner-backend-hmgj.onrender.com/api";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const protectedInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export { instance, protectedInstance };
