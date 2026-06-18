const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const Subscription = require("../models/Subscription");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 🔥 Stripe Webhook Route
router.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("🔥 Webhook Event:", event.type);

    // ==============================
    // ✅ PAYMENT SUCCESS EVENT
    // ==============================
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      try {
        const userId = session.metadata.userId;
        const plan = session.metadata.plan || "basic";

        // Example: 30 days subscription
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

        // Create or update subscription
        const subscription = await Subscription.findOneAndUpdate(
          { userId },
          {
            userId,
            plan,
            status: "active",
            startDate: new Date(),
            expiryDate,
          },
          { upsert: true, new: true }
        );

        console.log("✅ Subscription Activated:", subscription);
      } catch (error) {
        console.error("Subscription Error:", error.message);
      }
    }

    res.json({ received: true });
  }
);

module.exports = router;