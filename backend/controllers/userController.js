const User = require("../models/User");

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      phone,
      pickupLocation,
      dropLocation,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        phone,
        pickupLocation,
        dropLocation,
      },
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

module.exports = { updateProfile };