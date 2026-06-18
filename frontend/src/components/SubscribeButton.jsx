import React, { useState } from "react";
import { createCheckoutSession } from "../api/paymentApi";

const SubscribeButton = () => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);

      const data = await createCheckoutSession("premium");

      // 🔥 Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleSubscribe} disabled={loading}>
      {loading ? "Processing..." : "Subscribe Now 🚀"}
    </button>
  );
};

export default SubscribeButton;