const express = require('express')
const router = express.Router({ mergeParams: true })
const ratingController = require('../controllers/ratingController')
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: Residence ratings and reviews management
 */

/**
 * @swagger
 * /Ratings/residence/{residenceId}:
 *   get:
 *     summary: Get all ratings for a residence
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: residenceId
 *         required: true
 *         schema:
 *           type: string
 *         description: The residence ID
 *     responses:
 *       200:
 *         description: List of ratings
 *       404:
 *         description: Residence not found
 */
router.get('/residence/:residenceId', ratingController.getRatings)

/**
 * @swagger
 * /Ratings/residence/{residenceId}:
 *   post:
 *     summary: Post a rating for a residence
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: residenceId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               issue:
 *                 type: string
 *               starCount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Rating posted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - students only
 */
router.post('/residence/:residenceId', protect, authorizeRoles("student"), ratingController.postRating)

/**
 * @swagger
 * /Ratings/{id}/student/{studentId}:
 *   delete:
 *     summary: Delete a rating
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Rating ID
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Rating deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - students only
 */
router.delete('/:id/student/:studentId/', protect, authorizeRoles("student"), ratingController.deleteRating)

/**
 * @swagger
 * /Ratings/star:
 *   post:
 *     summary: Add or update star count for a residence
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               residenceId:
 *                 type: string
 *               stars:
 *                 type: number
 *     responses:
 *       200:
 *         description: Star count updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - students only
 */
router.post("/star", protect, authorizeRoles("student"), ratingController.upsertStarCount)

/**
 * @swagger
 * /Ratings/comment/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - students only
 */
router.delete('/comment/:id', protect, authorizeRoles("student"), ratingController.deleteComment)

/**
 * @swagger
 * /Ratings/issue/{id}:
 *   delete:
 *     summary: Delete an issue
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Issue ID
 *     responses:
 *       200:
 *         description: Issue deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - students only
 */
router.delete('/issue/:id', protect, authorizeRoles("student"), ratingController.deleteIssue)

/**
 * @swagger
 * /Ratings/residence/{residenceId}/my-star:
 *   get:
 *     summary: Get the current student's star count for a residence
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: residenceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student's star count
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - students only
 */
router.get('/residence/:residenceId/my-star', protect, authorizeRoles("student"), ratingController.getStudentStarCount)

/**
 * @swagger
 * /Ratings/residence/{residenceId}/average:
 *   get:
 *     summary: Get the average star count for a residence
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: residenceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Average star count
 *       404:
 *         description: Residence not found
 */
router.get('/residence/:residenceId/average', ratingController.getAverageStarCount)

/**
 * @swagger
 * /Ratings/{id}:
 *   put:
 *     summary: Update a rating
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Rating ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               issue:
 *                 type: string
 *               starCount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Rating updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - students only
 */
router.put('/:id', protect, authorizeRoles("student"), ratingController.updateRating)

module.exports = router;