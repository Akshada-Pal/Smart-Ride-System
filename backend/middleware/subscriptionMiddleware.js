const Subscription = require("../models/Subscription");

const checkSubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const subscription = await Subscription.findOne({ userId });

    if (!subscription) {
      return res.status(403).json({
        message: "No active subscription found",
      });
    }

    const now = new Date();

    // check expiry
    if (subscription.expiryDate < now) {
      subscription.status = "expired";
      await subscription.save();

      return res.status(403).json({
        message: "Subscription expired",
      });
    }

    // check status
    if (subscription.status !== "active") {
      return res.status(403).json({
        message: "Subscription is not active",
      });
    }

    // all good
    req.subscription = subscription;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Subscription check failed",
      error: error.message,
    });
  }
};

module.exports = checkSubscription;