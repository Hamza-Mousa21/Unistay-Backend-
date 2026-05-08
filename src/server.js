const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const db = require("../models");

const ratingRouter = require("../routes/ratingRoutes");
const wishListRouter = require("../routes/wishListRoutes");
const residenceRoutes = require("../routes/residenceRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/* ================= MIDDLEWARE ================= */

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= STATIC FILES ================= */

app.use("/uploads", express.static("uploads"));

/* ================= ROUTES ================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "UniStay backend is running",
  });
});

app.use("/ratings", ratingRouter);

app.use("/wishlist", wishListRouter);

app.use("/api/residences", residenceRoutes);

/* ================= START SERVER ================= */

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

startServer();s