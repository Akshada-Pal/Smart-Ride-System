import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1 style={{ color: "#16a34a" }}>
          🎉 Payment Successful!
        </h1>

        <p style={{ color: "#555" }}>
          Your subscription has been activated successfully.
        </p>

        <div style={{ marginTop: "15px" }}>
          <p>✔ You now have access to premium features</p>
          <p>✔ Priority ride booking unlocked</p>
          <p>✔ Discount benefits activated</p>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-primary"
          >
            Go to Dashboard
          </button>
        </div>

        <p
          style={{
            marginTop: "15px",
            fontSize: "13px",
            color: "gray",
          }}
        >
          Redirecting you to dashboard experience...
        </p>

      </div>

    </div>
  );
};

export default Success;