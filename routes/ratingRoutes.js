const express=require('express')
const router=express.Router()
const ratingController=require('../controllers/ratingController')
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");



router.get('/',ratingController.getRatings)
router.post('/',protect,authorizeRoles("student"),ratingController.postRating)
router.delete('/:id',protect,authorizeRoles("student"),ratingController.deleteRating)
//reminder: I will make an authorize for the stu Id to only him delete it

router.delete('/:id/comment',protect,authorizeRoles("student"),ratingController.deleteComment)
router.delete('/:id/issue',protect,authorizeRoles("student"),ratingController.deleteIssue)

router.put('/:id',protect,authorizeRoles("student"),ratingController.updateRating)

module.exports=router;
