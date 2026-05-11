const express = require("express");

const {
  registerStudent,
  loginStudent,
  getStudentProfile,
  updateStudentProfile,
  deleteStudentProfile,
} = require("../controllers/Auth/studentAuthController");

const {
  protect,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * ==================================================
 * STUDENT AUTHENTICATION ROUTES
 * ==================================================
 * POST   /register -> Register new student
 * POST   /login    -> Login student
 * GET    /profile  -> Get student profile
 * PUT    /profile  -> Update student profile
 * DELETE /profile  -> Delete student account
 * ==================================================
 */

/* ================= REGISTER ================= */

router.post(
  "/register",

  registerStudent
);

/* ================= LOGIN ================= */

router.post(
  "/login",

  loginStudent
);

/* ================= GET PROFILE ================= */

router.get(
  "/profile",

  protect,

  authorizeRoles("student"),

  getStudentProfile
);

/* ================= UPDATE PROFILE ================= */

router.put(
  "/profile",

  protect,

  authorizeRoles("student"),

  updateStudentProfile
);

/* ================= DELETE PROFILE ================= */

router.delete(
  "/profile",

  protect,

  authorizeRoles("student"),

  deleteStudentProfile
);

module.exports = router;