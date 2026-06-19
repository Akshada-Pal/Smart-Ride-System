import axios from "axios";

const API = "http://localhost:5000/api/payments";

export const createCheckoutSession = async (plan) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No auth token found");
    }

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
  } catch (error) {
    console.error("Checkout session error:", error);
    throw error;
  }
};