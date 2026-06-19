const express = require("express");
const router = express.Router();

const { updateProfile, getUserStats } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.get("/stats", protect, getUserStats);
router.put("/profile", protect, updateProfile);

module.exports = router;