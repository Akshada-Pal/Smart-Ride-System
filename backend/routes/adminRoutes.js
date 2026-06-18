const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getDashboardStats,
  getAllUsers,
  getAllDrivers,
  getSubscriptions,
  getRevenueStats,
} = require("../controllers/adminController");

const User = require("../models/User");
const Subscription = require("../models/Subscription");

/*
|--------------------------------------------------------------------------
| Existing Controller-Based Routes
|--------------------------------------------------------------------------
*/

router.get("/stats", protect, adminOnly, getDashboardStats);

router.get("/users", protect, adminOnly, getAllUsers);

router.get("/drivers", protect, adminOnly, getAllDrivers);

router.get("/subscriptions", protect, adminOnly, getSubscriptions);

router.get("/revenue", protect, adminOnly, getRevenueStats);

/*
|--------------------------------------------------------------------------
| New Direct Routes (Use different paths to avoid conflicts)
|--------------------------------------------------------------------------
*/

// 📊 Detailed Users List
router.get("/users/all", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});

// 📊 Detailed Subscriptions List
router.get("/subscriptions/all", protect, adminOnly, async (req, res) => {
  try {
    const subscriptions = await Subscription.find().populate("userId");

    res.json({
      success: true,
      count: subscriptions.length,
      subscriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch subscriptions",
      error: error.message,
    });
  }
});

// 📊 Quick Stats
router.get("/stats/summary", protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const activeSubs = await Subscription.countDocuments({
      status: "active",
    });

    const expiredSubs = await Subscription.countDocuments({
      status: "expired",
    });

    res.json({
      success: true,
      stats: {
        totalUsers,
        activeSubscriptions: activeSubs,
        expiredSubscriptions: expiredSubs,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
      error: error.message,
    });
  }
});

module.exports = router;