const express = require("express");
const dotenv = require("dotenv");
const db = require("../models");

const residenceRoutes = require("./routes/residenceRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow access to uploaded images
app.use("/uploads", express.static("uploads"));

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "UniStay backend is running",
  });
});

// Residence routes
app.use("/api/residences", residenceRoutes);

/**
 * Start server after database connection is verified.
 */
const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connected successfully");

    await db.sequelize.sync({ alter: true });
    console.log("Database tables synced successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
  }
};

startServer();