import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
  fetchStats();
  fetchUsers();
  fetchSubscriptions();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  // 📊 Stats
  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data.stats);
    } catch (err) {
      console.log(err);
    }
  };

  // 👥 Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  // 💳 Subscriptions
  const fetchSubscriptions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/subscriptions",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubscriptions(res.data.subscriptions);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔥 Admin Dashboard</h1>

      {/* 📊 STATS */}
      {stats && (
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={cardStyle}>👥 Users: {stats.totalUsers}</div>
          <div style={cardStyle}>
            ✅ Active: {stats.activeSubscriptions}
          </div>
          <div style={cardStyle}>
            ⛔ Expired: {stats.expiredSubscriptions}
          </div>
        </div>
      )}

      {/* 👥 USERS TABLE */}
      <h2 style={{ marginTop: "30px" }}>Users</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 💳 SUBSCRIPTIONS TABLE */}
      <h2 style={{ marginTop: "30px" }}>Subscriptions</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Expiry</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((s) => (
            <tr key={s._id}>
              <td>{s.userId?.name || s.userId}</td>
              <td>{s.plan}</td>
              <td>{s.status}</td>
              <td>
                {new Date(s.expiryDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const cardStyle = {
  padding: "15px",
  background: "#f2f2f2",
  borderRadius: "8px",
  minWidth: "150px",
  textAlign: "center",
};

export default AdminDashboard;