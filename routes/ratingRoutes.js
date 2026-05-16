const express=require('express')
const router=express.Router({mergeParams: true})
const ratingController=require('../controllers/ratingController')
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");



router.get('/residence/:residenceId',ratingController.getRatings)
router.post('/residence/:residenceId',protect,authorizeRoles("student"),ratingController.postRating)
router.delete('/:id/student/:studentId/',protect,authorizeRoles("student"),ratingController.deleteRating)
router.post("/star", protect, authorizeRoles("student"), ratingController.upsertStarCount)
router.delete('/comment/:id',protect,authorizeRoles("student"),ratingController.deleteComment)
router.delete('/issue/:id',protect,authorizeRoles("student"),ratingController.deleteIssue)
router.get('/residence/:residenceId/my-star', protect,authorizeRoles("student"), ratingController.getStudentStarCount)
router.get('/residence/:residenceId/average', ratingController.getAverageStarCount)

router.put('/:id',protect,authorizeRoles("student"),ratingController.updateRating)

module.exports=router;
