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
 * @swagger
 * tags:
 *   name: Student
 *   description: Student authentication and profile management
 */

/**
 * @swagger
 * /student/register:
 *   post:
 *     summary: Register a new student
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student registered successfully
 *       400:
 *         description: Validation error
 */
router.post("/register", registerStudent);

/**
 * @swagger
 * /student/login:
 *   post:
 *     summary: Login a student
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginStudent);

/**
 * @swagger
 * /student/profile:
 *   get:
 *     summary: Get student profile
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student profile data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - students only
 */
router.get("/profile", protect, authorizeRoles("student"), getStudentProfile);

/**
 * @swagger
 * /student/profile:
 *   put:
 *     summary: Update student profile
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - students only
 */
router.put("/profile", protect, authorizeRoles("student"), updateStudentProfile);

/**
 * @swagger
 * /student/profile:
 *   delete:
 *     summary: Delete student account
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - students only
 */
router.delete("/profile", protect, authorizeRoles("student"), deleteStudentProfile);

module.exports = router;