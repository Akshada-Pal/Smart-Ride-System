const User = require("../models/User");

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

module.exports = { createSubscription };