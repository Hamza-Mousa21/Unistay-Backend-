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
 * @swagger
 * tags:
 *   name: Owner
 *   description: Owner authentication and profile management
 */

/**
 * @swagger
 * /owner/register:
 *   post:
 *     summary: Register a new owner
 *     tags: [Owner]
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
 *         description: Owner registered successfully
 *       400:
 *         description: Validation error
 */
router.post("/register", registerOwner);

/**
 * @swagger
 * /owner/login:
 *   post:
 *     summary: Login an owner
 *     tags: [Owner]
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
router.post("/login", loginOwner);

/**
 * @swagger
 * /owner/profile:
 *   get:
 *     summary: Get owner profile
 *     tags: [Owner]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Owner profile data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/profile", protect, authorizeRoles("owner"), getOwnerProfile);

/**
 * @swagger
 * /owner/{owner_id}/info:
 *   get:
 *     summary: Get owner contact info
 *     tags: [Owner]
 *     parameters:
 *       - in: path
 *         name: owner_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The owner's ID
 *     responses:
 *       200:
 *         description: Owner contact information
 *       404:
 *         description: Owner not found
 */
router.get("/:owner_id/info", getOwnerContactInfo);

/**
 * @swagger
 * /owner/profile:
 *   put:
 *     summary: Update owner profile
 *     tags: [Owner]
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
 *         description: Forbidden
 */
router.put("/profile", protect, authorizeRoles("owner"), updateOwnerProfile);

/**
 * @swagger
 * /owner/profile:
 *   delete:
 *     summary: Delete owner account
 *     tags: [Owner]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete("/profile", protect, authorizeRoles("owner"), deleteOwnerProfile);

module.exports = router;