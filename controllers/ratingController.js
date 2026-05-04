const ratingService=require('../services/ratingService')


const getRatings=async(req,res)=>{
    try{
    const rate=await ratingService.getRatings()
    if(rate.lengh===0){
       return res.status(200).json({message:"No ratings yet"})
    }
    res.status(200).json(rate)
    }
    catch{
        res.status(500).json({message:"Server error"})
    }   
        
}


const postRating=async(req,res)=>{
    try{
        const rate=await ratingService.postRating(req.body)
        res.status(200).json({message:"Rate published"})
    }
    catch{
        res.status(500).json({message:"Server error"})
    }
}


const deleteRating=async(req,res)=>{
    try{
        const rate=await ratingService.deleteRating(req.params)
        if (rate===null){
            res.status(404).json({message:"Rate not found!"})
        }
        res.status(201).json({message:"Rating deleted"})
    }
    catch{
        res.status(500).json({message:"Server error"})
    }

}





const updateRating=async(req,res)=>{
    try{
        const rate=await ratingService.updateRating(req.params,req.body)
        if(rate==null){
            return res.status(404).json({message:"Rate not found!"})
        }
        res.status(201).json({message:"Rating updated"})
    }
    catch{
        res.status(500).json({message:"Server error"})
    }
}

module.exports={
    getRatings,
    postRating,
    updateRating,
    deleteRating
}
