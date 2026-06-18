const cron = require("node-cron");
const Subscription = require("../models/Subscription");

const runSubscriptionExpiryJob = () => {
  // Runs every day at 12:00 AM
  cron.schedule("0 0 * * *", async () => {
    try {
      console.log("Running subscription expiry job...");

      const now = new Date();

      const expired = await Subscription.updateMany(
        {
          expiryDate: { $lt: now },
          status: "active",
        },
        {
          $set: { status: "expired" },
        }
      );

      console.log(
        `Expired subscriptions updated: ${expired.modifiedCount}`
      );
    } catch (error) {
      console.error("Cron job error:", error.message);
    }
  });
};

module.exports = runSubscriptionExpiryJob;