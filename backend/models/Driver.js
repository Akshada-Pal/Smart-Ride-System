const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,

    vehicleNumber: String,

    role: {
      type: String,
      default: "driver",
    },

    assignedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    attendance: [
      {
        date: String,
        status: {
          type: String,
          default: "absent", // present / absent
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);