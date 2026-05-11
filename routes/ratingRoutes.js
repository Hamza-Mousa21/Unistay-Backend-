const express=require('express')
const router=express.Router()
const ratingController=require('../controllers/ratingController')
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");



router.get('/',ratingController.getRatings)
router.post('/student/:studentId/',protect,authorizeRoles("student"),ratingController.postRating)
router.delete('/:id/student/:studentId/',protect,authorizeRoles("student"),ratingController.deleteRating)
//reminder: I will make an authorize for the stu Id to only him delete it

router.delete('/:id/student/:studentId/comment',protect,authorizeRoles("student"),ratingController.deleteComment)
router.delete('/:id/student/:studentId/issue',protect,authorizeRoles("student"),ratingController.deleteIssue)

router.put('/:id',protect,authorizeRoles("student"),ratingController.updateRating)

module.exports=router;
