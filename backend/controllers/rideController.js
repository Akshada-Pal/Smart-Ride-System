const Ride = require("../models/Ride");

// =========================
// CREATE RIDE (BOOK RIDE)
// =========================
const bookRide = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { pickup, destination } = req.body;

    if (!pickup || !destination) {
      return res.status(400).json({
        message: "Pickup and destination are required",
      });
    }

    const fare = Math.floor(Math.random() * 500) + 100;

    const ride = await Ride.create({
      userId,
      pickup,
      destination,
      fare,
      status: "pending",
    });

    res.json({
      message: "Ride booked successfully",
      ride,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// GET USER RIDES
// =========================
const getMyRides = async (req, res) => {
  try {
    const rides = await Ride.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({ rides });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// UPDATE RIDE STATUS (ADMIN)
// =========================
const updateRideStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["pending", "completed", "cancelled"];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const ride = await Ride.findById(id);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    ride.status = status;
    await ride.save();

    res.json({
      message: "Ride status updated",
      ride,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  bookRide,
  getMyRides,
  updateRideStatus,
};