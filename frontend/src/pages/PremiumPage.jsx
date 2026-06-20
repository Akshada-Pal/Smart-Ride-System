import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import SubscribeButton from "../components/SubscribeButton";

const Premium = () => {
const [isPremium, setIsPremium] = useState(false);
const [loading, setLoading] = useState(true);

const checkSubscription = async () => {
try {
setLoading(true);


  const token = getToken();

  const res = await axios.get(
    "http://localhost:5000/api/subscription/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const subscription = res.data.subscription;

  setIsPremium(subscription?.status === "active");
} catch (error) {
  setIsPremium(false);
} finally {
  setLoading(false);
}


};

useEffect(() => {
checkSubscription();

const handleFocus = () => {
  checkSubscription();
};

window.addEventListener("focus", handleFocus);

return () => {
  window.removeEventListener("focus", handleFocus);
};


}, []);

return (
  <div className="premium-page">

    <div className="premium-overlay"></div>

    <div className="premium-content">

      <h1 className="premium-title">
        💎 Premium Membership
      </h1>

<div className="premium-header">
  <span className="premium-badge"><h1>Drive Beyond Limits</h1></span>
  <p>
    Unlock exclusive ride benefits, priority service,
    and premium travel experiences.
  </p>
</div>

      {loading ? (
        <div className="premium-card">
          <p>Checking access...</p>
        </div>
      ) : isPremium ? (
        <>
          <div className="premium-card glass">

            <h2>🚀 Premium Features Unlocked</h2>

            <ul className="feature-list">
              <li>⚡ Priority Ride Booking</li>
              <li>💸 Discounted Rides</li>
              <li>👑 VIP Customer Support</li>
              <li>🚘 Faster Driver Matching</li>
              <li>🎁 Exclusive Offers</li>
            </ul>

          </div>

          <div className="premium-card premium-highlight">
            <h3>🔥 Enjoy Your Premium Experience</h3>
          </div>
        </>
      ) : (
        <>
          <div className="premium-card glass danger">

            <h2>🔒 Premium Access Locked</h2>

            <p>
              Upgrade today and unlock exclusive benefits.
            </p>

            <SubscribeButton />

          </div>

          <div className="premium-card">

           <h3>✨ Premium Features Waiting For You</h3>

<ul className="feature-list missing">
  <li>🚖 Priority Ride Matching</li>
  <li>💸 Members-Only Ride Discounts</li>
  <li>🎯 Faster Driver Allocation</li>
  <li>🎁 Exclusive Premium Rewards</li>
  <li>⚡ Instant Booking Confirmation</li>
  <li>👑 VIP Customer Support</li>
</ul>

<p className="premium-note">
  Upgrade to Premium and unlock a faster,
  smarter and more comfortable ride experience.
</p>

          </div>
        </>
      )}

    </div>
  </div>
);
};

export default Premium;
