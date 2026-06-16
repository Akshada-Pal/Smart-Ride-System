const User = require("../models/User");
const Driver = require("../models/Driver");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalDrivers = await Driver.countDocuments();

    const activeSubscriptions = await User.countDocuments({
      subscriptionStatus: "active",
    });

    const inactiveSubscriptions = await User.countDocuments({
      subscriptionStatus: "inactive",
    });

    res.json({
      totalUsers,
      totalDrivers,
      activeSubscriptions,
      inactiveSubscriptions,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().select("-password");

    res.json(drivers);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await User.find({
      subscriptionStatus: "active",
    }).select(
      "name email subscriptionPlan subscriptionStart subscriptionEnd"
    );

    res.json(subscriptions);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getAllDrivers,
  getSubscriptions,
};