const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const checkSubscription = require("../middleware/subscriptionMiddleware");

// 🔐 Premium Route (Protected)
router.get(
  "/premium-data",
  authMiddleware,
  checkSubscription,
  (req, res) => {
    res.json({
      message: "Welcome to premium content",
      userId: req.user.id,
      subscription: req.subscription,
    });
  }
);

module.exports = router;