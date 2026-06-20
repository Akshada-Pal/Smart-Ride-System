const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
console.log("Stripe Key Length:", process.env.STRIPE_SECRET_KEY?.length);

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const driverRoutes = require("./routes/driverRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const premiumRoutes = require("./routes/premiumRoutes");
const rideRoutes = require("./routes/rideRoutes");
const webhookRoutes = require("./routes/webhookRoutes");

// DB connect
connectDB();

const app = express();


// 🔥 STEP 1: Webhook MUST stay before JSON parser
app.use("/api/webhook", webhookRoutes);


// 🔥 STEP 2: FIXED CORS (IMPORTANT FOR DEPLOYMENT)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://your-frontend.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);


// Middleware
app.use(express.json());


// Cron job
const runSubscriptionExpiryJob = require("./cron/subscriptionCron");
runSubscriptionExpiryJob();


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api", premiumRoutes);
app.use("/api/ride", rideRoutes);


// Home route
app.get("/", (req, res) => {
  res.send("🚗 Smart Ride API Running...");
});


// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});