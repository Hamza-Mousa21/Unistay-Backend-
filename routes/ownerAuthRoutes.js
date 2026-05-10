const express = require("express");

const {
  registerOwner,
  loginOwner,
} = require("../controllers/Auth/ownerAuthController");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * ==================================================
 * OWNER AUTHENTICATION ROUTES
 * ==================================================
 * POST /register -> Register new owner account
 * POST /login    -> Login existing owner account
 * GET  /profile  -> Protected owner route
 * ==================================================
 */

/* ================= REGISTER OWNER ================= */

router.post("/register", registerOwner);

/* ================= LOGIN OWNER ================= */

router.post("/login", loginOwner);

/* ================= OWNER PROFILE ================= */

router.get(
  "/profile",

  protect,

  authorizeRoles("owner"),

  (req, res) => {
    return res.status(200).json({
      success: true,

      message: "Owner profile accessed successfully",

      user: req.user,
    });
  },
);

module.exports = router;
