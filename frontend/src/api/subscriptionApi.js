import axios from "axios";

const API = "https://smart-ride-backend-j8xk.onrender.com/api/subscription";

export const getMySubscription = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};