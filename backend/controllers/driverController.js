const Driver = require("../models/Driver");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// REGISTER DRIVER (Admin use)
const registerDriver = async (req, res) => {
  try {
    const { name, email, password, phone, vehicleNumber } = req.body;

    const exists = await Driver.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Driver already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const driver = await Driver.create({
      name,
      email,
      phone,
      vehicleNumber,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Driver created successfully",
      driver,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN DRIVER
const loginDriver = async (req, res) => {
  try {
    const { email, password } = req.body;

    const driver = await Driver.findOne({ email });

    if (!driver) {
      return res.status(400).json({ message: "Driver not found" });
    }

    const isMatch = await bcrypt.compare(password, driver.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: driver._id, role: "driver" },
      "secretkey",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      driver,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign user to driver
const assignUserToDriver = async (req, res) => {
  try {
    const { driverId, userId } = req.body;

    const driver = await Driver.findById(driverId);

    driver.assignedUsers.push(userId);

    await driver.save();

    res.json({
      message: "User assigned to driver",
      driver,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Get assigned users
const getAssignedUsers = async (req, res) => {
  try {
    const { driverId } = req.params;

    const driver = await Driver.findById(driverId)
      .populate(
        "assignedUsers",
        "name email phone pickupLocation dropLocation subscriptionStatus"
      );

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    res.json({
      assignedUsers: driver.assignedUsers,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const markAttendance = async (req, res) => {
  try {
    const { driverId, status } = req.body;

    const driver = await Driver.findById(driverId);

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    const today = new Date().toISOString().split("T")[0];

    driver.attendance.push({
      date: today,
      status,
    });

    await driver.save();

    res.json({
      message: "Attendance marked successfully",
      attendance: driver.attendance,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



module.exports = {
  registerDriver,
  loginDriver,
  assignUserToDriver,
   getAssignedUsers,
   markAttendance
};