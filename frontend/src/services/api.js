import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-ride-backend-j8xk.onrender.com/api",
});

export default API;