import axios from "axios";

const API = "http://localhost:5000/api/payments";

export const createCheckoutSession = async (plan) => {
  try {
    const token = localStorage.getItem("token");

    console.log("PLAN SENT:", plan);

    const res = await axios.post(
      `${API}/create-checkout-session`,
      { plan },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("SUCCESS RESPONSE:", res.data);

    return res.data;
  } catch (error) {
    console.log("❌ FULL ERROR:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Payment failed");
    throw error;
  }
};