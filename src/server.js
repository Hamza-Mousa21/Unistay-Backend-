<<<<<<< HEAD
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// const db = require("../models");

// const ratingRouter = require("../routes/ratingRoutes");
// const wishListRouter = require("../routes/wishListRoutes");
// const residenceRoutes = require("../routes/residenceRoutes");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// /* ================= MIDDLEWARE ================= */

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// /* ================= STATIC FILES ================= */

// app.use("/uploads", express.static("uploads"));

// /* ================= ROUTES ================= */

// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "UniStay backend is running",
//   });
// });

// app.use("/ratings", ratingRouter);

// app.use("/wishlist", wishListRouter);

// app.use("/api/residences", residenceRoutes);

// /* ================= START SERVER ================= */

// const startServer = async () => {
//   try {
//     await db.sequelize.authenticate();
//     console.log("Database connected successfully");

//     await db.sequelize.sync({ alter: true });
//     console.log("Database tables synced successfully");

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });

//   } catch (error) {
//     console.error("Server startup error:", error);
//   }
// };

// startServer();



const express=require('express')
const app=express()
const db=require('../models')
const cors =require('cors')
const Ratingrouter=require('../routes/ratingRoutes')
const wishListRouter=require('../routes/wishListRoutes')
=======
const express = require("express");

const dotenv = require("dotenv");
>>>>>>> Sewar-Backend

const cors = require("cors");

<<<<<<< HEAD
const dotenv = require("dotenv");

const db = require("../models");

const studentAuthRoutes = require("../routes/studentAuthRoutes");
=======
const db = require("../models");

const ownerAuthRoutes = require("../routes/ownerAuthRoutes");
>>>>>>> Sewar-Backend

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

<<<<<<< HEAD
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
=======
/**
 * ==================================================
 * GLOBAL MIDDLEWARES
 * ==================================================
 */

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

/**
 * ==================================================
 * BASE ROUTE
 * ==================================================
 */

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,

>>>>>>> Sewar-Backend
    message: "UniStay backend is running",
  });
});

<<<<<<< HEAD
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
=======
/**
 * ==================================================
 * OWNER AUTH ROUTES
 * ==================================================
 */

app.use("/api/owner", ownerAuthRoutes);

/**
 * ==================================================
 * START SERVER
 * ==================================================
>>>>>>> Sewar-Backend
 */

const startServer = async () => {
  try {
<<<<<<< HEAD
    /* ================= DATABASE CONNECTION ================= */

=======
>>>>>>> Sewar-Backend
    await db.sequelize.authenticate();

    console.log("Database connected successfully");

<<<<<<< HEAD
    /* ================= SYNC DATABASE ================= */

=======
>>>>>>> Sewar-Backend
    await db.sequelize.sync();

    console.log("Database tables synced successfully");

<<<<<<< HEAD
    /* ================= START SERVER ================= */

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
=======
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
>>>>>>> Sewar-Backend
    });
  } catch (error) {
    console.error("Server startup error:", error);
  }
};

startServer();
