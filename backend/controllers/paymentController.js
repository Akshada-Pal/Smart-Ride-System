const Payment = require("../models/Payment");
const Subscription = require("../models/Subscription");

const createPayment = async (req, res) => {
  try {
    const { amount, plan } = req.body;
    const userId = req.user.id;

    // =========================
    // 1. CREATE PAYMENT RECORD
    // =========================
    const payment = await Payment.create({
      user: userId,
      amount,
      plan,
      transactionId: "TXN" + Date.now(),
      status: "success",
    });

    // =========================
    // 2. PLAN DURATION
    // =========================
    let days = 30;
    if (plan === "weekly") days = 7;
    if (plan === "monthly") days = 30;
    if (plan === "yearly") days = 365;

    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(startDate.getDate() + days);

    // =========================
    // 3. ACTIVATE SUBSCRIPTION
    // =========================
    const subscription = await Subscription.findOneAndUpdate(
      { userId },
      {
        userId,
        planType: plan,
        status: "active",
        startDate,
        expiryDate,
      },
      { upsert: true, new: true }
    );

    return res.status(201).json({
      message: "Payment successful & subscription activated",
      payment,
      subscription,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};



const getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(payments);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const getRevenueStats = async (req, res) => {
  try {
    const payments = await Payment.find();

    const totalRevenue = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    const totalPayments = payments.length;

    res.json({
      totalRevenue,
      totalPayments,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createPayment,
  getPaymentHistory,
  getRevenueStats,
};