import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import SubscribeButton from "../components/SubscribeButton";

const Premium = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    try {
      const token = getToken();

      const res = await axios.get(
        "http://localhost:5000/api/subscription/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsPremium(res.data.subscription?.status === "active");
    } catch (err) {
      setIsPremium(false);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="premium-page">

    <h1 className="premium-title">💎 Premium Zone</h1>

    {loading ? (
      <div className="premium-card">
        <p>Checking access...</p>
      </div>
    ) : isPremium ? (
      <>
        <div className="premium-card glass">
          <h2>🚀 Premium Features Unlocked</h2>

          <ul className="feature-list">
            <li>✔ Priority Ride Booking</li>
            <li>✔ Discounted Rides</li>
            <li>✔ VIP Customer Support</li>
            <li>✔ Faster Driver Matching</li>
            <li>✔ Exclusive Offers</li>
          </ul>
        </div>

        <div className="premium-card highlight">
          <h3>🔥 Enjoy your premium experience</h3>
        </div>
      </>
    ) : (
      <>
        <div className="premium-card glass danger">
          <h2>🔒 Premium Access Locked</h2>
          <p>You need a subscription to access premium features.</p>

          <SubscribeButton />
        </div>

        <div className="premium-card">
          <h3>🚀 Unlock Premium Features</h3>

          <ul className="feature-list missing">
            <li>❌ Priority Booking</li>
            <li>❌ Discount Rides</li>
            <li>❌ VIP Support</li>
          </ul>
        </div>
      </>
    )}
  </div>
);
};

export default Premium;