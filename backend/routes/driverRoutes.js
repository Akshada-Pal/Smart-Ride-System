const express = require("express");
const router = express.Router();

const {
  registerDriver,
  loginDriver,
  assignUserToDriver,
  getAssignedUsers,
  markAttendance,
} = require("../controllers/driverController");

// Admin will create driver
router.post("/register", registerDriver);

// Driver login
router.post("/login", loginDriver);

router.post("/assign-user", assignUserToDriver);

router.get("/assigned-users/:driverId", getAssignedUsers);

router.post("/attendance", markAttendance);


module.exports = router;