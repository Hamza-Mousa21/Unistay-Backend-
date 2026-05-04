const express=require('express')
const router=express.Router()
const ratingController=require('../controllers/ratingController')


router.get('/',ratingController.getRatings)
router.post('/',ratingController.postRating)
router.delete('/:id',ratingController.deleteRating)
router.put('/:id',ratingController.updateRating)

module.exports=router;
