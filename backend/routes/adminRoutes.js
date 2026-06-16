const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getAllUsers,
  getAllDrivers,
  getSubscriptions,
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/stats", protect, adminOnly, getDashboardStats);

router.get("/users", protect, adminOnly, getAllUsers);

router.get("/drivers", protect, adminOnly, getAllDrivers);

router.get("/subscriptions", protect, adminOnly, getSubscriptions);


module.exports = router;