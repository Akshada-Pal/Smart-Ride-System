import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "../utils/auth";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const activateSubscription = async () => {
      try {
        const token = getToken();

        if (token) {
          // 🔥 THIS IS THE IMPORTANT PART (CREATE SUBSCRIPTION)
          await axios.post(
            "http://localhost:5000/api/subscription/create",
            {
              plan: "monthly",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        // wait and redirect
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);

      } catch (err) {
        console.log("Subscription activation error:", err);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    };

    activateSubscription();
  }, [navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 style={{ color: "#16a34a" }}>
          🎉 Payment Successful!
        </h1>

        <p style={{ color: "#555" }}>
          Activating your premium subscription...
        </p>

        <div style={{ marginTop: "20px" }}>
          <p>✔ Payment confirmed</p>
          <p>✔ Creating subscription</p>
          <p>✔ Redirecting to dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default Success;