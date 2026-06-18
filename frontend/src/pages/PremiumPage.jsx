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
    <div className="container">

      <h1>💎 Premium Zone</h1>

      {loading ? (
        <div className="card">
          <p>Checking access...</p>
        </div>
      ) : isPremium ? (
        <>
          {/* PREMIUM CONTENT */}
          <div className="card">
            <h2>🚀 Premium Features Unlocked</h2>
            <p>✔ Priority Ride Booking</p>
            <p>✔ Discounted Rides</p>
            <p>✔ VIP Customer Support</p>
            <p>✔ Faster Driver Matching</p>
            <p>✔ Exclusive Offers</p>
          </div>

          <div className="card" style={{ marginTop: "20px" }}>
            <h3>🔥 Enjoy your premium experience</h3>
          </div>
        </>
      ) : (
        <>
          {/* LOCKED CONTENT */}
          <div className="card">
            <h2>🔒 Premium Access Locked</h2>
            <p>You need a subscription to access premium features.</p>

            <SubscribeButton />
          </div>

          <div className="card" style={{ marginTop: "20px" }}>
            <h3>What you are missing:</h3>
            <p>❌ Priority Booking</p>
            <p>❌ Discount Rides</p>
            <p>❌ VIP Support</p>
          </div>
        </>
      )}

    </div>
  );
};

export default Premium;