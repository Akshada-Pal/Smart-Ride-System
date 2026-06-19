import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "../utils/auth";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const refreshSubscription = async () => {
      try {
        const token = getToken();

        if (token) {
          // 🔥 force backend refresh (reads latest webhook-updated data)
          await axios.get("http://localhost:5000/api/subscription/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        // give backend time to process webhook if delayed
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);

      } catch (err) {
        console.log("Success page error:", err);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    };

    refreshSubscription();
  }, [navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1 style={{ color: "#16a34a" }}>
          🎉 Payment Successful!
        </h1>

        <p style={{ color: "#555" }}>
          Your premium subscription is being activated...
        </p>

        <div style={{ marginTop: "20px" }}>
          <p>✔ Payment verified</p>
          <p>✔ Subscription updating</p>
          <p>✔ Redirecting to dashboard</p>
        </div>

        <p style={{ marginTop: "20px", fontSize: "13px", color: "gray" }}>
          Please wait a moment...
        </p>

      </div>
    </div>
  );
};

export default Success;