const express = require("express");

const {
  registerStudent,
  loginStudent,
} = require("../controllers/Auth/studentAuthController");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Student Authentication Routes
|--------------------------------------------------------------------------
| POST /register -> Register new student account
| POST /login    -> Login existing student account
| GET  /profile  -> Protected student route
|--------------------------------------------------------------------------
*/

/* ================= REGISTER ================= */

router.post("/register", registerStudent);

/* ================= LOGIN ================= */

router.post("/login", loginStudent);

/* ================= PROTECTED PROFILE ================= */

router.get(
  "/profile",

  protect,

  authorizeRoles("student"),

  (req, res) => {
    return res.status(200).json({
      success: true,

      message: "Student profile accessed successfully",

      user: req.user,
    });
  },
);

module.exports = router;
