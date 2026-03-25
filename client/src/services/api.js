import axios from "axios";

const API = axios.create({
  baseURL: "https://digital-heros-assignment-production.up.railway.app/api",
  withCredentials: true,
});

export default API;
