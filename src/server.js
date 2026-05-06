const express = require("express");
const dotenv = require("dotenv");
const db = require("../models");

const studentAuthRoutes = require("./routes/studentAuthRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Base route to check if the backend server is running
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "UniStay backend is running",
  });
});

// Student authentication routes
app.use("/api/student", studentAuthRoutes);

/**
 * Starts the Express server after confirming database connection.
 * Sequelize sync is used to keep models aligned with database tables.
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
