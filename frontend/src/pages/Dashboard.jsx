import React, { useEffect, useState, useCallback } from "react";
import "../styles/dashboard.css";
import axios from "axios";

import SubscriptionStatus from "../components/SubscriptionStatus";
import SubscribeButton from "../components/SubscribeButton";
import { getUser, getToken } from "../utils/auth";
import { bookRide, getMyRides } from "../api/rideApi";

const Dashboard = () => {
  const user = getUser();

  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(false);

  const [stats, setStats] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [rides, setRides] = useState([]);

  const [showRideForm, setShowRideForm] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const isPremium = subscription?.status === "active";

  // =========================
  // 🔄 LOAD DASHBOARD
  // =========================
  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);

      const [subRes, statsRes, ridesData] = await Promise.all([
        checkSubscription(),
        fetchStats(),
        loadRides(),
      ]);

      return { subRes, statsRes, ridesData };
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();

    const handleFocus = () => {
      loadDashboard();
    };

    window.addEventListener("focus", handleFocus);

    return () => window.removeEventListener("focus", handleFocus);
  }, [loadDashboard]);

  // =========================
  // 🚗 LOAD RIDES
  // =========================
  const loadRides = async () => {
    try {
      const data = await getMyRides();
      setRides(data?.rides || []);
    } catch {
      setRides([]);
    }
  };

  // =========================
  // 🚗 BOOK RIDE
  // =========================
  const handleBookRide = async () => {
    if (!pickup || !destination) {
      alert("Please enter pickup and destination");
      return;
    }

    try {
      setBooking(true);

      await bookRide({ pickup, destination });

      setPickup("");
      setDestination("");
      setShowRideForm(false);

      await loadRides();
    } catch {
      alert("Failed to book ride");
    } finally {
      setBooking(false);
    }
  };

  // =========================
  // 🚀 UPDATE RIDE STATUS (NO RELOAD)
  // =========================
  const updateRideStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/ride/status/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      setRides((prev) =>
        prev.map((ride) =>
          ride._id === id ? { ...ride, status } : ride
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // 🔐 SUBSCRIPTION
  // =========================
  const checkSubscription = async () => {
    try {
      const token = getToken();
      if (!token) return setSubscription(null);

      const res = await axios.get(
        "http://localhost:5000/api/subscription/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSubscription(res.data.subscription || null);
    } catch {
      setSubscription(null);
    }
  };

  // =========================
  // 📊 STATS
  // =========================
  const fetchStats = async () => {
    try {
      const token = getToken();
      if (!token) return setStats({});

      const res = await axios.get(
        "http://localhost:5000/api/user/stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStats(res.data || {});
    } catch {
      setStats({});
    }
  };

  // =========================
  // 🚪 LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!user) {
    return <div className="dashboard-empty">No user found</div>;
  }

  return (
    <div className="dashboard-page">

      {/* HERO */}
      <div className="dashboard-hero">
        <div className="profile-avatar">
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>

        <div>
          <h1>Welcome, {user.name}</h1>
          <p>Manage your rides, subscriptions and premium benefits.</p>

          <span className="premium-badge">
            {isPremium ? "⭐ Premium Member" : "👤 Standard Member"}
          </span>
        </div>
      </div>

      {/* STATS */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>🚗 Total Rides</h3>
          <h2>{stats?.rides || 0}</h2>
        </div>

        <div className="stat-card">
          <h3>⭐ Rating</h3>
          <h2>{stats?.rating || 0}</h2>
        </div>

        <div className="stat-card">
          <h3>💳 Subscription</h3>
          <h2>{isPremium ? "Active" : "Inactive"}</h2>
        </div>

        <div className="stat-card">
          <h3>💰 Savings</h3>
          <h2>₹{stats?.savings || 0}</h2>
        </div>
      </div>

      {/* PROFILE */}
      <div className="dashboard-section">
        <h2>👤 My Profile</h2>

        <div className="profile-grid">
          <div><p>Name</p><h4>{user.name}</h4></div>
          <div><p>Email</p><h4>{user.email}</h4></div>
          <div><p>Role</p><h4>{user.role}</h4></div>
        </div>
      </div>

      {/* SUBSCRIPTION */}
      <div className="dashboard-card">
        <h2>💳 My Subscription</h2>

        <SubscriptionStatus
          subscription={subscription}
          loading={loading}
        />

        <SubscribeButton />
      </div>

      {/* QUICK ACTIONS */}
      <div className="dashboard-card">
        <h2>⚡ Quick Actions</h2>

        <div className="action-grid">
          <button
            className="action-btn"
            onClick={() => setShowRideForm(true)}
            disabled={booking}
          >
            🚘 Book Ride
          </button>

          <button className="action-btn">💎 Upgrade Plan</button>
          <button className="action-btn">📞 Support</button>
          <button className="action-btn">👤 Edit Profile</button>
        </div>
      </div>

      {/* RIDE FORM */}
      {showRideForm && (
        <div className="dashboard-card">
          <h2>Book Ride</h2>

          <input
            placeholder="Pickup Location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />

          <input
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <button onClick={handleBookRide} disabled={booking}>
            {booking ? "Booking..." : "Confirm Ride"}
          </button>

          <button onClick={() => setShowRideForm(false)}>
            Cancel
          </button>
        </div>
      )}

      {/* MY RIDES */}
      <div className="dashboard-card">
        <h2>🚘 My Bookings</h2>

        {rides.length === 0 ? (
          <div className="empty-box">No rides yet 🚗</div>
        ) : (
          rides.map((ride) => (
            <div key={ride._id} className="ride-card">

              <p>📍 {ride.pickup} → {ride.destination}</p>

              <div className="ride-bottom">
                <span>💰 ₹{ride.fare}</span>
                <span>{ride.status}</span>
              </div>

              {user.role === "admin" && (
                <div className="admin-actions">
                  <button onClick={() => updateRideStatus(ride._id, "completed")}>
                    Mark Completed
                  </button>

                  <button onClick={() => updateRideStatus(ride._id, "cancelled")}>
                    Cancel
                  </button>
                </div>
              )}

            </div>
          ))
        )}
      </div>

      {/* LOGOUT */}
      <div className="dashboard-logout">
        <button onClick={handleLogout}>Logout</button>
      </div>

    </div>
  );
};

export default Dashboard;