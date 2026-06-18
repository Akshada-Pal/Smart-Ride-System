

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env
dotenv.config();


const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const driverRoutes = require("./routes/driverRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const premiumRoutes = require("./routes/premiumRoutes");

const webhookRoutes = require("./routes/webhookRoutes"); // ✅ ADD THIS

const runSubscriptionExpiryJob = require("./cron/subscriptionCron");



// DB connect
connectDB();

const app = express();

app.use(cors());

// ⚠️ IMPORTANT: Webhook must come BEFORE express.json()
app.use("/api/webhook", webhookRoutes);

// Normal JSON middleware AFTER webhook
app.use(express.json());

// Cron job
runSubscriptionExpiryJob();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api", premiumRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Smart Ride API Running...");
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});