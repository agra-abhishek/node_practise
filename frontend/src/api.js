import axios from "axios";

const API = axios.create({
  baseURL: "https://mycurd-wfvv.onrender.com/api",
  withCredentials: true, // 🔥 important for cookies
});

export default API;
