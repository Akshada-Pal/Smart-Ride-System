const User = require("../models/User");
const Ride = require("../models/Ride");

// =========================
// UPDATE PROFILE
// =========================
const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { phone, pickupLocation, dropLocation } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { phone, pickupLocation, dropLocation },
      { new: true }
    );

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// GET USER STATS
// =========================
const getUserStats = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 🔥 IMPORTANT: make sure field matches Ride model
    const rides = await Ride.find({ userId });

    const totalRides = rides.length;

    let totalSpent = 0;

    for (let i = 0; i < rides.length; i++) {
      totalSpent += rides[i]?.fare || 0;
    }

    // 💰 simple savings logic
    const savings = totalSpent * 0.1;

    // ⭐ simple rating logic (can improve later)
    const rating =
      totalRides > 0
        ? Math.min(5, 3.5 + totalRides * 0.1)
        : 0;

    res.json({
      rides: totalRides,
      rating: Number(rating.toFixed(1)),
      savings: Number(savings.toFixed(2)),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  updateProfile,
  getUserStats,
};