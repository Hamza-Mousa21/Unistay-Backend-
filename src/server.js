const express = require("express");

const dotenv = require("dotenv");

const db = require("../models");

const studentAuthRoutes = require("../routes/studentAuthRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

/* ==================================================
   MIDDLEWARES
================================================== */

// Parse incoming JSON requests
app.use(express.json());

/* ==================================================
   BASE ROUTE
================================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "UniStay backend is running",
  });
});

/* ==================================================
   ROUTES
================================================== */

// Student Authentication Routes
app.use("/api/student", studentAuthRoutes);

/* ==================================================
   START SERVER
================================================== */

/**
 * Starts Express server after
 * confirming database connection.
 */

const startServer = async () => {
  try {
    /* ================= DATABASE CONNECTION ================= */

    await db.sequelize.authenticate();

    console.log("Database connected successfully");

    /* ================= SYNC DATABASE ================= */

    await db.sequelize.sync();

    console.log("Database tables synced successfully");

    /* ================= START SERVER ================= */

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
  }
};

startServer();
