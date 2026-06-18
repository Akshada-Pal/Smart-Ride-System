import React, { useEffect, useState } from "react";
import { getMySubscription } from "../api/subscriptionApi";

const SubscriptionStatus = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMySubscription();
        setSubscription(data.subscription);
      } catch (error) {
        console.error("Error fetching subscription:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading subscription...</p>;

  return (
    <div>
      {subscription && subscription.status === "active" ? (
        <h3 style={{ color: "green" }}>
          ✅ Premium Active (Expires: {subscription.expiryDate})
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