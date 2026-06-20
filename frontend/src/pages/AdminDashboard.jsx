import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/adminDashboard.css";


const AdminDashboard = () => {
const [stats, setStats] = useState(null);
const [users, setUsers] = useState([]);
const [subscriptions, setSubscriptions] = useState([]);

const token = localStorage.getItem("token");

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  fetchStats();
  fetchUsers();
  fetchSubscriptions();
}, []);

const fetchStats = async () => {
try {
const res = await axios.get(
"http://localhost:5000/api/admin/stats",
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);


  setStats(res.data?.stats || null);
} catch (err) {
  console.log("Stats Error:", err);
}

};

const fetchUsers = async () => {
try {
const res = await axios.get(
"http://localhost:5000/api/admin/users",
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);


  setUsers(res.data?.users || []);
} catch (err) {
  console.log("Users Error:", err);
  setUsers([]);
}


};

const fetchSubscriptions = async () => {
try {
const res = await axios.get(
"http://localhost:5000/api/admin/subscriptions",
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);


  setSubscriptions(res.data?.subscriptions || []);
} catch (err) {
  console.log("Subscriptions Error:", err);
  setSubscriptions([]);
}


};

return (

  <div className="admin-page">

```
<div className="admin-hero">
  <h1 className="admin-title">
    👑 Smart Ride Admin Control Center
  </h1>

  <p className="admin-subtitle">
    Manage users, subscriptions and monitor platform activity.
  </p>
</div>

{stats && (
  <div className="stats-grid">

    <div className="stat-card users-card">
      <div className="stat-icon">👥</div>
      <h3>Total Users</h3>
      <h2>{stats.totalUsers || 0}</h2>
    </div>

    <div className="stat-card active-card">
      <div className="stat-icon">✅</div>
      <h3>Active Plans</h3>
      <h2>{stats.activeSubscriptions || 0}</h2>
    </div>

    <div className="stat-card expired-card">
      <div className="stat-icon">⛔</div>
      <h3>Expired Plans</h3>
      <h2>{stats.expiredSubscriptions || 0}</h2>
    </div>

  </div>
)}

{/* USERS SECTION */}

<div className="admin-section">

  <div className="section-header">
    <h2>👥 Registered Users</h2>
  </div>

  <div className="table-wrapper">

    <table className="admin-table">

      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>

      <tbody>
        {users.length > 0 ? (
          users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <span
                  className={
                    u.role === "admin"
                      ? "role-admin"
                      : "role-user"
                  }
                >
                  {u.role}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="empty-row">
              No users found
            </td>
          </tr>
        )}
      </tbody>

    </table>

  </div>

</div>

{/* SUBSCRIPTIONS SECTION */}

<div className="admin-section">

  <div className="section-header">
    <h2>💳 Subscription Management</h2>
  </div>

  <div className="table-wrapper">

    <table className="admin-table">

      <thead>
        <tr>
          <th>User</th>
          <th>Plan</th>
          <th>Status</th>
          <th>Expiry</th>
        </tr>
      </thead>

      <tbody>
        {subscriptions.length > 0 ? (
          subscriptions.map((s) => (
            <tr key={s._id}>
              <td>{s.userId?.name || "Unknown User"}</td>

              <td>{s.planType}</td>

              <td>
                <span className={`status-${s.status}`}>
                  {s.status}
                </span>
              </td>

              <td>
                {s.expiryDate
                  ? new Date(
                      s.expiryDate
                    ).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="empty-row">
              No subscriptions found
            </td>
          </tr>
        )}
      </tbody>

    </table>

  </div>

</div>
```

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


