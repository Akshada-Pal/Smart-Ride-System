import React, { useState } from "react";
import { createCheckoutSession } from "../api/paymentApi";

const SubscribeButton = () => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);

      const data = await createCheckoutSession("monthly");

      if (!data?.url) {
        throw new Error("Checkout URL not found");
      }

      // Stripe redirect
      window.location.href = data.url;

    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="subscribe-btn" onClick={handleSubscribe} disabled={loading}>
      {loading ? "Processing..." : "Subscribe Now 🚀"}
    </button>
  );
};

export default SubscribeButton;