import axios from "axios";

const API = "http://localhost:5000/api/subscription";

export const getMySubscription = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};