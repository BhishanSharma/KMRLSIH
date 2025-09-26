// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://51.20.32.249/",
  // baseURL: "https://lyricalcoder-sih.hf.space",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
