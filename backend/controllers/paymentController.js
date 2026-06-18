const Payment = require("../models/Payment");


const createPayment = async (req, res) => {
  try {
    const { amount, plan } = req.body;

    const payment = await Payment.create({
      user: req.user.id,
      amount,
      plan,
      transactionId: "TXN" + Date.now(),
      status: "success",
    });

    res.status(201).json({
      message: "Payment successful",
      payment,
    });

  } catch (error) {
    res.status(500).json({
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