import { getUser, logout } from "../services/auth";

const Dashboard = () => {
  const user = getUser();

  return (
    <div>
      <h1>Smart Ride Dashboard 🚗</h1>

      {user ? (
        <>
          <p>Welcome 👋 {user.id}</p>
          <p>Role: {user.role}</p>

          <button onClick={() => {
            logout();
            window.location.href = "/";
          }}>
            Logout
          </button>
        </>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
};

export default Dashboard;