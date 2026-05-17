const express = require("express");

const {
  addResidence,
  getAllResidences,
  getResidenceById,
  updateResidence,
  deleteResidence,
  searchResidences
} = require("../controllers/residenceController");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Residence
 *   description: Residence management
 */

/**
 * @swagger
 * /residence:
 *   get:
 *     summary: Get all residences
 *     tags: [Residence]
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *       - in: query
 *         name: wifi
 *         schema:
 *           type: boolean
 *         description: Filter by wifi availability
 *     responses:
 *       200:
 *         description: List of all residences
 */
router.get("/", getAllResidences);

/**
 * @swagger
 * /residence/{id}:
 *   get:
 *     summary: Get a single residence by ID
 *     tags: [Residence]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Residence ID
 *     responses:
 *       200:
 *         description: Residence data
 *       404:
 *         description: Residence not found
 */
router.get("/:id", getResidenceById);

/**
 * @swagger
 * /residence/add:
 *   post:
 *     summary: Add a new residence (owner only)
 *     tags: [Residence]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               wifi:
 *                 type: boolean
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Up to 5 images
 *     responses:
 *       201:
 *         description: Residence added successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - owners only
 */
router.post("/add", protect, authorizeRoles("owner"), upload.array("images", 5), addResidence);

/**
 * @swagger
 * /residence/search:
 *   post:
 *     summary: Search residences
 *     tags: [Residence]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               keyword:
 *                 type: string
 *               minPrice:
 *                 type: number
 *               maxPrice:
 *                 type: number
 *               wifi:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Search results
 */
router.post("/search", searchResidences);

/**
 * @swagger
 * /residence/{id}:
 *   put:
 *     summary: Update a residence (owner only)
 *     tags: [Residence]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Residence ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               wifi:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Residence updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - owners only
 *       404:
 *         description: Residence not found
 */
router.put("/:id", protect, authorizeRoles("owner"), updateResidence);

/**
 * @swagger
 * /residence/{id}:
 *   delete:
 *     summary: Delete a residence (owner only)
 *     tags: [Residence]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Residence ID
 *     responses:
 *       200:
 *         description: Residence deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - owners only
 *       404:
 *         description: Residence not found
 */
router.delete("/:id", protect, authorizeRoles("owner"), deleteResidence);

module.exports = router;