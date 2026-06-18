const express = require("express");
const router = express.Router();

const {
  createSubscription,
  activateSubscription,
  getMySubscription
} = require("../controllers/subscriptionController");

const protect = require("../middleware/authMiddleware");

// create subscription
router.post("/create", protect, createSubscription);

// activate subscription
router.post("/activate", protect, activateSubscription);

// 🔥 ADD THIS ROUTE
router.get("/me", protect, getMySubscription);

module.exports = router;