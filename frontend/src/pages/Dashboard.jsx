import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import axios from "axios";


import SubscriptionStatus from "../components/SubscriptionStatus";
import SubscribeButton from "../components/SubscribeButton";
import { getUser, getToken, logout } from "../utils/auth";

const Dashboard = () => {
  const user = getUser();

  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    try {
      const token = getToken();

      if (!token) {
        setIsPremium(false);
        setLoading(false);
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/subscription/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsPremium(res.data.subscription?.status === "active");
    } catch (error) {
      console.error("Subscription check failed:", error);
      setIsPremium(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="dashboard-empty">
        <h2>No user found</h2>
      </div>
    );
  }

  return (
  <div className="dashboard-page">


{/* //Hero section */}
  <div className="dashboard-hero">

  <div className="profile-avatar">
    {user?.name?.charAt(0)?.toUpperCase()}
  </div>

  <div>
    <h1>Welcome, {user.name}</h1>

    <p>
      Manage your rides, subscriptions and premium benefits.
    </p>

    <span className="premium-badge">
      {isPremium ? "⭐ Premium Member" : "👤 Standard Member"}
    </span>
  </div>

</div>



<div className="dashboard-stats">

  <div className="stat-card">
    <h3>🚗 Total Rides</h3>
    <h2>12</h2>
  </div>

  <div className="stat-card">
    <h3>⭐ Rating</h3>
    <h2>4.8</h2>
  </div>

  <div className="stat-card">
    <h3>💳 Subscription</h3>
    <h2>Active</h2>
  </div>

  <div className="stat-card">
    <h3>💰 Savings</h3>
    <h2>₹8,400</h2>
  </div>

</div>




   <div className="dashboard-section">

  <h2>👤 My Profile</h2>

  <div className="profile-grid">

    <div>
      <p>Name</p>
      <h4>{user.name}</h4>
    </div>

    <div>
      <p>Email</p>
      <h4>{user.email}</h4>
    </div>

    <div>
      <p>Role</p>
      <h4>{user.role}</h4>
    </div>

  </div>

</div>


<div className="dashboard-card">

  <h2>💳 My Subscription</h2>

  <div className="subscription-box">

    <SubscriptionStatus />

    <div style={{ marginTop: "20px" }}>
      <SubscribeButton />
    </div>

  </div>

</div>


<div className="dashboard-section">

  <h2>📈 Recent Activity</h2>

  <div className="timeline">

    <div className="timeline-item">
      ✅ Logged into account
    </div>

    <div className="timeline-item">
      💳 Subscription activated
    </div>

    <div className="timeline-item">
      🚗 Premium ride booked
    </div>

  </div>

</div>

    {/* BOOKINGS */}
    <div className="dashboard-card">
      <h2>🚘 My Bookings</h2>

      <div className="empty-box">
        No bookings available yet.
      </div>
    </div>

    {/* PREMIUM FEATURES */}
    <div className="dashboard-card">
      <h2>⭐ Premium Features</h2>

      {loading ? (
        <p>Checking subscription...</p>
      ) : isPremium ? (
        <div className="feature-grid">

          <div className="feature-box">
            ✔ Priority Booking
          </div>

          <div className="feature-box">
            ✔ VIP Support
          </div>

          <div className="feature-box">
            ✔ Discount Rides
          </div>

          <div className="feature-box">
            ✔ Luxury Fleet Access
          </div>

        </div>
      ) : (
        <div className="locked-box">
          🔒 Subscribe to unlock premium features.
        </div>
      )}
    </div>

    {/* RIDE HISTORY */}
    <div className="dashboard-card">
      <h2>📋 Ride History</h2>

      <div className="empty-box">
        No rides completed yet.
      </div>
    </div>


<div className="dashboard-card">

  <h2>⚡ Quick Actions</h2>

  <div className="action-grid">

    <button className="action-btn">
      🚘 Book Ride
    </button>

    <button className="action-btn">
      💎 Upgrade Plan
    </button>

    <button className="action-btn">
      📞 Support
    </button>

    <button className="action-btn">
      👤 Edit Profile
    </button>

  </div>

</div>
    {/* LOGOUT */}
    <div className="dashboard-logout">
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>

  </div>
);
};

export default Dashboard;