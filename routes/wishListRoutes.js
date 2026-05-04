const express=require('express')
const router=express.Router()

const wishlistController=require('../controllers/wishlistController')

router.get('/',wishlistController.getAllWishedList)
router.post('/',wishlistController.addToWishlist)
router.delete('/:id',wishlistController.removeFromWishlist)

module.exports=router