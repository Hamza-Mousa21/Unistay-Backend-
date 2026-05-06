import express from "express";
import dotenv from "dotenv";
import db from "../models/index.js";

import ownerAuthRoutes from "./routes/ownerAuthRoutes.js";
import residenceRoutes from "./routes/residenceRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Allow access to uploaded residence images
app.use("/uploads", express.static("uploads"));

// Base route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "UniStay backend is running",
  });
});

// Routes
app.use("/api/owner", ownerAuthRoutes);
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