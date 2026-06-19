const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  bookRide,
  getMyRides,
  updateRideStatus
} = require("../controllers/rideController");

// =========================
// USER ROUTES
// =========================
router.post("/", protect, bookRide);
router.get("/my", protect, getMyRides);

// =========================
// ADMIN ROUTE (FIXED)
// =========================
router.put("/status/:id", protect, adminOnly, updateRideStatus);

module.exports = router;