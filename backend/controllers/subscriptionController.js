const Subscription = require("../models/Subscription");

// ============================
// CREATE SUBSCRIPTION (manual plan activation)
// ============================
const createSubscription = async (req, res) => {
  try {
    const userId = req.user.id;
    const { plan } = req.body;

    let days = 0;

    if (plan === "monthly") days = 30;
  else if (plan === "weekly") days = 7;
    else if (plan === "yearly") days = 365;
    else {
      return res.status(400).json({ message: "Invalid plan" });
    }

    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + days);

    const subscription = await Subscription.create({
      userId,
      planType: plan,
      status: "active",
      startDate: start,
      expiryDate: end,
    });

    return res.json({
      message: "Subscription created",
      subscription,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ============================
// ACTIVATE SUBSCRIPTION (Stripe webhook use)
// ============================
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

    const subscription = await Subscription.findOneAndUpdate(
      { userId },
      {
        userId,
        planType,
        status: "active",
        startDate,
        expiryDate,
        paymentId,
        orderId,
      },
      { upsert: true, new: true }
    );

    return res.json({
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

// ============================
// GET CURRENT USER SUBSCRIPTION
// ============================
const getMySubscription = async (req, res) => {
try {
const subscription = await Subscription.findOne({
userId: req.user.id,
}).sort({ createdAt: -1 });

if (!subscription || subscription.status !== "active") {
  return res.json({
    subscription: null,
  });
}

return res.json({
  subscription,
});

} catch (error) {
return res.status(500).json({
message: "Server error",
});
}
};



const cancelSubscription = async (req, res) => {
try {
const subscription = await Subscription.findOne({
userId: req.user.id,
status: "active",
}).sort({ createdAt: -1 });


if (!subscription) {
  return res.status(404).json({
    message: "No active subscription found",
  });
}

subscription.status = "cancelled";

await subscription.save();

return res.json({
  message: "Subscription cancelled successfully",
  subscription,
});


} catch (error) {
return res.status(500).json({
message: error.message,
});
}
};



module.exports = {
  createSubscription,
  activateSubscription,
  getMySubscription,
  cancelSubscription,
};