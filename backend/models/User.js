const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,

    role: {
      type: String,
      default: "user",
    },

    pickupLocation: String,
    dropLocation: String,

    subscriptionPlan: {
      type: String, // monthly, quarterly, yearly
      default: null,
    },

    subscriptionStatus: {
      type: String,
      default: "inactive", // active / inactive
    },

    phone: {
  type: String,
},


dropLocation: {
  type: String,
},

    subscriptionStart: Date,
    subscriptionEnd: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);