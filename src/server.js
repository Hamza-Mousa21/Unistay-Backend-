import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import * as db from "../models/index.js";

import ownerAuthRoutes from "./routes/ownerAuthRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

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
  })
);

/**
 * ==================================================
 * BASE ROUTE
 * ==================================================
 */

app.get("/", (req, res) => {

  return res.status(200).json({
    success: true,
    message: "UniStay backend is running",
  });

});

/**
 * ==================================================
 * OWNER AUTH ROUTES
 * ==================================================
 */

app.use(
  "/api/owner",
  ownerAuthRoutes
);

/**
 * ==================================================
 * START SERVER
 * ==================================================
 */

const startServer = async () => {

  try {

    await db.loadModels();

    await db.sequelize.authenticate();

    console.log(
      "Database connected successfully"
    );

    await db.sequelize.sync();

    console.log(
      "Database tables synced successfully"
    );

    app.listen(PORT, () => {

      console.log(
        `Server running on port ${PORT}`
      );

    });

  } catch (error) {

    console.error(
      "Server startup error:",
      error
    );

  }
};

startServer();