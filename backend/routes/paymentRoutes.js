const express = require("express");
const router = express.Router();


const Stripe = require("stripe");
console.log("🔥 STRIPE KEY:", process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const {
  getPaymentHistory,
  getRevenueStats,
} = require("../controllers/paymentController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// ===============================
// STRIPE CHECKOUT SESSION (FIXED)
// ===============================
router.post("/create-checkout-session", protect, async (req, res) => {
  try {
    const { plan } = req.body;

    // 🔥 PLAN VALIDATION + PRICING
    let amount = 0;

    if (plan === "weekly") amount = 10000;      // ₹100
    else if (plan === "monthly") amount = 30000; // ₹300
    else if (plan === "yearly") amount = 100000; // ₹1000
    else {
      return res.status(400).json({ message: "Invalid plan type" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${plan.toUpperCase()} Subscription`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",

      // 🔥 IMPORTANT FOR WEBHOOK
      metadata: {
        userId: req.user.id,
        plan: plan,
      },

      success_url: "https://smart-ride-system.vercel.app//success",
      cancel_url: "https://smart-ride-system.vercel.app//cancel",
    });

    return res.json({ url: session.url });

  } catch (error) {
  console.log("🔥 STRIPE ERROR FULL:", error);

  return res.status(500).json({
    message: "Payment session failed",
    error: error.message,
    stack: error.stack,
  });
}
});

// ===============================
// OTHER ROUTES
// ===============================
router.get("/history", protect, getPaymentHistory);
router.get("/revenue", protect, adminOnly, getRevenueStats);

module.exports = router;