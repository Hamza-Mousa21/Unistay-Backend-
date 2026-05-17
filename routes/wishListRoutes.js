const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");
const wishlistController = require("../controllers/wishlistController");

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Student wishlist management
 */

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get all wishlisted residences
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wishlisted residences
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - students only
 */
router.get("/", protect, authorizeRoles("student"), wishlistController.getAllWishedList);

/**
 * @swagger
 * /wishlist/{res_id}:
 *   get:
 *     summary: Get wishlist item by residence ID
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: res_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Residence ID
 *     responses:
 *       200:
 *         description: Wishlist item data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - students only
 *       404:
 *         description: Not found
 */
router.get("/:res_id", protect, authorizeRoles("student"), wishlistController.getWishlistByResId);

/**
 * @swagger
 * /wishlist/{res_id}:
 *   post:
 *     summary: Add a residence to wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: res_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Residence ID
 *     responses:
 *       201:
 *         description: Added to wishlist successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - students only
 *       409:
 *         description: Already in wishlist
 */
router.post("/:res_id", protect, authorizeRoles("student"), wishlistController.addToWishlist);

/**
 * @swagger
 * /wishlist/{res_id}:
 *   delete:
 *     summary: Remove a residence from wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: res_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Residence ID
 *     responses:
 *       200:
 *         description: Removed from wishlist successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - students only
 *       404:
 *         description: Wishlist item not found
 */
router.delete("/:res_id", protect, authorizeRoles("student"), wishlistController.removeFromWishlist);

module.exports = router;