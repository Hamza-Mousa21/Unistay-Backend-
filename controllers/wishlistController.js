const wishlistService=require('../services/wishListService')
const db=require('../models')


const getAllWishedList=async(req,res)=>{

    try{
        const student=await db.Student.findByPk(req.params.studentId)
        if(!student){
            return res.status(401).json({message:"User not found!"})
        }
        const residence=await db.Residence.findByPk(req.params.residenceId)
        if(!residence){
            return res.status(401).json({message:"Resiedence Is not found!"})
        }



        const wish=await wishlistService.getWishedList()
        if (wish.length===0){
            return res.status(201).json({message:"No liked items to show"})
        }
        res.status(201).json(wish)
    }
    catch{
        res.status(500).json({message:"Server Error"})
    }
}

const addToWishlist=async(req,res)=>{
    try{
        const student=await db.Student.findByPk(req.params.studentId)
        if(!user){
            return res.status(401).json({message:"User not found!"})
        }
        const residence=await db.Residence.findByPk(req.params.residenceId)
        if(!residence){
            return res.status(401).json({message:"Resiedence Is not found!"})
        }


        const wish=await wishlistService.addToWishList(req.body)
        res.status(201).json({message:"resident liked"})
    }
    catch{
        res.status(500).json({message:"Server Error"})
    }
}


const removeFromWishlist=async(req,res)=>{
    try{
        const student=await db.Student.findByPk(req.params.studentId)
        if(!user){
            return res.status(401).json({message:"User not found!"})
        }
        const residence=await db.Residence.findByPk(req.params.residenceId)
        if(!residence){
            return res.status(401).json({message:"Resiedence Is not found!"})
        }


        const wish=await wishlistService.removeFromWishList(req.params)
        if(wish===null){
            return res.status(404).json({message:"didn't remove ir"})
        }
        res.status(200).json({message:"unliked the resident"})
        }
    catch(error){
        console.error(error)
        res.status(500).json({message:"Server error"})
    }

}

module.exports={
    addToWishlist,
    removeFromWishlist,
    getAllWishedList
}