const express = require("express");

const {
  registerOwner,
  loginOwner,
  getOwnerProfile,
  updateOwnerProfile,
  deleteOwnerProfile,
  getOwnerContactInfo,
} = require("../controllers/Auth/ownerAuthController");

const {
  protect,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * ==================================================
 * OWNER AUTHENTICATION ROUTES
 * ==================================================
 * POST   /register -> Register new owner
 * POST   /login    -> Login owner
 * GET    /profile  -> Get owner profile
 * PUT    /profile  -> Update owner profile
 * DELETE /profile  -> Delete owner account
 * ==================================================
 */

/* ================= REGISTER OWNER ================= */

router.post(
  "/register",

  registerOwner
);

/* ================= LOGIN OWNER ================= */

router.post(
  "/login",

  loginOwner
);


/* ================= GET OWNER PROFILE ================= */

router.get(
  "/profile",

  protect,

  authorizeRoles("owner"),

  getOwnerProfile
);



router.get("/:owner_id/info", getOwnerContactInfo);



/* ================= UPDATE OWNER PROFILE ================= */

router.put(
  "/profile",

  protect,

  authorizeRoles("owner"),

  updateOwnerProfile
);

/* ================= DELETE OWNER PROFILE ================= */

router.delete(
  "/profile",

  protect,

  authorizeRoles("owner"),

  deleteOwnerProfile
);

module.exports = router;