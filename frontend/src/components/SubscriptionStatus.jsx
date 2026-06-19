import React from "react";

const SubscriptionStatus = ({ subscription, loading }) => {
  if (loading) return <p>Checking subscription...</p>;

  const isActive = subscription?.status === "active";

  return (
    <div className="subscription-status">
      {isActive ? (
        <h3 style={{ color: "green" }}>
          ✅ Premium Active (Expires:{" "}
          {subscription?.expiryDate
            ? new Date(subscription.expiryDate).toLocaleDateString()
            : "N/A"}
          )
        </h3>
      ) : (
        <h3 style={{ color: "red" }}>
          ❌ No Active Subscription
        </h3>
      )}
    </div>
  );
};

export default SubscriptionStatus;