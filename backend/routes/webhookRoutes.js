const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const Subscription = require("../models/Subscription");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ==============================
// STRIPE WEBHOOK
// ==============================
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
    // PAYMENT SUCCESS
    // ==============================
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      try {
        const userId = session.metadata.userId;
        const planType = session.metadata.plan;

        // 🔥 PLAN BASED EXPIRY
        let days = 30;

        if (planType === "weekly") days = 7;
        else if (planType === "monthly") days = 30;
        else if (planType === "yearly") days = 365;

        const startDate = new Date();
        const expiryDate = new Date();
        expiryDate.setDate(startDate.getDate() + days);

        const subscription = await Subscription.findOneAndUpdate(
          { userId },
          {
            userId,
            planType,
            status: "active",
            startDate,
            expiryDate,
            paymentId: session.payment_intent,
            orderId: session.id,
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