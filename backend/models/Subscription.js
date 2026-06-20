const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    planType: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
      required: true,
    },

    status: {
  type: String,
  enum: ["pending", "active", "expired", "cancelled"],
  default: "pending",
},

    startDate: {
      type: Date,
    },

    expiryDate: {
      type: Date,
    },

    paymentId: String,
    orderId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);