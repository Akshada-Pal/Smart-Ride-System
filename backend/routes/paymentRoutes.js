const express = require("express");
const router = express.Router();

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const {
  getPaymentHistory,
  getRevenueStats,
} = require("../controllers/paymentController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// 🔥 CREATE STRIPE CHECKOUT SESSION (UPDATED)
router.post("/create-checkout-session", protect, async (req, res) => {
  try {
    const { plan } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${plan} Subscription`,
            },
            unit_amount: plan === "premium" ? 50000 : 20000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",

      // 🔥 VERY IMPORTANT FOR WEBHOOK
      metadata: {
        userId: req.user.id,
        plan: plan,
      },

      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({
      message: "Payment session failed",
      error: error.message,
    });
  }
});

// Keep your existing routes
router.get("/history", protect, getPaymentHistory);

router.get("/revenue", protect, adminOnly, getRevenueStats);

module.exports = router;