const User = require("../models/User");
const Subscription = require("../models/Subscription");

// CREATE / UPDATE SUBSCRIPTION
const createSubscription = async (req, res) => {
  try {
    const userId = req.user.id;

    const { plan } = req.body; 
    // monthly / quarterly / yearly

    let days = 0;

    if (plan === "monthly") days = 30;
    else if (plan === "quarterly") days = 90;
    else if (plan === "yearly") days = 365;

    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + days);

    const user = await User.findByIdAndUpdate(
      userId,
      {
        subscriptionPlan: plan,
        subscriptionStatus: "active",
        subscriptionStart: start,
        subscriptionEnd: end,
      },
      { new: true }
    );

    res.json({
      message: "Subscription activated",
      user,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const activateSubscription = async (req, res) => {
  try {
    const { userId, planType, paymentId, orderId } = req.body;

    let days = 0;

    if (planType === "weekly") days = 7;
    else if (planType === "monthly") days = 30;
    else if (planType === "yearly") days = 365;
    else {
      return res.status(400).json({ message: "Invalid plan type" });
    }

    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(startDate.getDate() + days);

    const subscription = await Subscription.create({
      userId,
      planType,
      status: "active",
      startDate,
      expiryDate,
      paymentId,
      orderId,
    });

    return res.status(200).json({
      message: "Subscription activated successfully",
      subscription,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error activating subscription",
      error: error.message,
    });
  }
};


const getMySubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    if (!subscription) {
      return res.json({
        subscription: null,
      });
    }

    res.json({
      subscription,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createSubscription,
  activateSubscription,
  getMySubscription,
};