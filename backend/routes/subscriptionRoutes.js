const express = require("express");
const router = express.Router();

const { createSubscription } = require("../controllers/subscriptionController");
const protect = require("../middleware/authMiddleware");

router.post("/create", protect, createSubscription);

module.exports = router;