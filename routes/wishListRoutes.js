const express=require('express')
const router=express.Router()

const wishlistController=require('../controllers/wishlistController')

router.get('/',wishlistController.getAllWishedList)
router.post('/student/:studentId/',wishlistController.addToWishlist)
router.delete('/student/:studentId/',wishlistController.removeFromWishlist)

module.exports=router