import axios from "axios";
import { getToken } from "../utils/auth";

const API = "https://smart-ride-backend-j8xk.onrender.com/api/ride";

// 🚗 BOOK RIDE (FIXED)
export const bookRide = async (data) => {
  const token = getToken();

  const res = await axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// 🚗 GET MY RIDES
export const getMyRides = async () => {
  const token = getToken();

  const res = await axios.get(`${API}/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};