import axios from "axios";
import { getToken } from "../utils/auth";

const API = "http://localhost:5000/api/ride";

// 🚗 BOOK RIDE
export const bookRide = async (data) => {
  const token = getToken();

  const res = await axios.post(`${API}/book`, data, {
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