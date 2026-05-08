import express from "express";

import {
  registerOwner,
  loginOwner,
} from "../controllers/Auth/ownerAuthController.js";

import {
  protect,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Owner Authentication Routes
|--------------------------------------------------------------------------
| POST /register -> Register new owner account
| POST /login    -> Login existing owner account
| GET  /profile  -> Protected owner route
|--------------------------------------------------------------------------
*/

router.post(
  "/register",
  registerOwner
);

router.post(
  "/login",
  loginOwner
);

router.get(
  "/profile",

  protect,

  authorizeRoles("owner"),

  (req, res) => {

    return res.status(200).json({
      success: true,
      message:
        "Owner profile accessed successfully",

      user: req.user,
    });
  }
);

export default router;