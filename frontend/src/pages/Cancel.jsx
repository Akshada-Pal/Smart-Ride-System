import React from "react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1 style={{ color: "#dc2626" }}>❌ Payment Cancelled</h1>

        <p style={{ color: "#555" }}>
          Your payment was not completed. No charges were made.
        </p>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>

        <p style={{ marginTop: "15px", fontSize: "14px", color: "gray" }}>
          You can retry subscription anytime from your dashboard.
        </p>

      </div>

    </div>
  );
};

export default Cancel;