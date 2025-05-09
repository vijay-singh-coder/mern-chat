import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
