const express = require("express");
const router = express.Router();

const {
  createSubscription,
  activateSubscription,
  getMySubscription,
} = require("../controllers/subscriptionController");

const protect = require("../middleware/authMiddleware");

// ============================
// SUBSCRIPTION ROUTES
// ============================

// Create manual subscription (admin/testing)
router.post("/create", protect, createSubscription);

// Activate subscription (Stripe / payment success)
router.post("/activate", protect, activateSubscription);

// Get current user subscription (frontend dashboard)
router.get("/me", protect, getMySubscription);

module.exports = router;