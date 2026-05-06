import express from "express";
import {
  registerStudent,
  loginStudent,
} from "../controllers/studentAuthController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Student Authentication Routes
|--------------------------------------------------------------------------
| POST /register -> Register new student account
| POST /login    -> Login existing student account
|--------------------------------------------------------------------------
*/

router.post("/register", registerStudent);
router.post("/login", loginStudent);

router.get("/profile", protect, authorizeRoles("student"), (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Student profile accessed successfully",
    user: req.user,
  });
});

export default router;
