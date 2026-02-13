import axios from "axios";

const API = axios.create({
  baseURL: "https://node-practise-100.onrender.com/api",
  withCredentials: true, // 🔥 important for cookies
});

export default API;
