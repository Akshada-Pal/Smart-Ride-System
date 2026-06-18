import axios from "axios";

const API = "http://localhost:5000/api/payments";

export const createCheckoutSession = async (plan) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${API}/create-checkout-session`,
    { plan },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};