const ratingService=require('../services/ratingService')
 const db=require('../models')
const { response } = require('express')

const getRatings=async(req,res)=>{
    try{
        const residence=await db.Residence.findByPk(req.params.residenceId)
        if (!residence){
            return res.status(404).json({message:"Residence is not found!"})
        }  
        console.log(1)
        const rate=await ratingService.getRatings(req.params.residenceId)
        if(rate.length===0){
            console.log(2)
            return res.status(200).json({message:"No ratings yet"})
        }
        console.log(3)
        res.status(200).json(rate)
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"Server ERRRR"})
    }   
        
}


const postRating=async(req,res)=>{

    try{
        // const student=await db.Student.findByPk(req.body.user_id)
        // if(!student){
        //     return res.status(401).json({message:"User not found!"})
        // }
        // const residence=await db.Residence.findByPk(req.body.res_id)
        // if(!residence){
        //     return res.status(401).json({message:"Resiedence Is not found!"})
        // }
        const rate=await ratingService.postRating(req.body)
        res.status(201).json(rate)
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"Server error"})
    }
}


const deleteRating=async(req,res)=>{
    try{
        const student=await db.Student.findByPk(req.params.studentId)
        if(!student){
            return res.status(401).json({message:"User not found!"})
        }
        const residence=await db.Residence.findByPk(req.params.residenceId)
        if(!residence){
            return res.status(401).json({message:"Resiedence Is not found!"})
        }


        const rate=await ratingService.deleteRating(req.params)
        if (rate===null){
            return res.status(404).json({message:"Rate not found!"})
        }
        res.status(201).json({message:"Rating deleted"})
    }
    catch{
        res.status(500).json({message:"Server error"})
    }

}





const updateRating=async(req,res)=>{
    try{
        const student=await db.Student.findByPk(req.params.studentId)
        if(!student){
            return res.status(401).json({message:"User not found!"})
        }
        const residence=await db.Residence.findByPk(req.params.residenceId)
        if(!residence){
            return res.status(401).json({message:"Resiedence Is not found!"})
        }


        const rate=await ratingService.updateRating(req.params,req.body)
        if(rate==null){
            return res.status(404).json({message:"Rate not found!"})
        }
        res.status(201).json(rate)
    }
    catch{
        res.status(500).json({message:"Server error"})
    }
}


const deleteComment=async(req,res)=>{
    try{
         const student=await db.Student.findByPk(req.params.studentId)
        if(!student){
            return res.status(401).json({message:"User not found!"})
        }
        const residence=await db.Residence.findByPk(req.params.residenceId)
        if(!residence){
            return res.status(401).json({message:"Resiedence Is not found!"})
        }


        const rate=await ratingService.deleteComment(req.params)
        if (rate===null){
            res.status(201).json({message:"Comment was NOT deleted!"})
        }
        res.status(201).json({message:"Comment deleted"})
    }
    catch{
        res.status(500).json({message:"Server error"})
    }


}


const deleteIssue=async(req,res)=>{
    try{
        const student=await db.Student.findByPk(req.params.studentId)
        if(!student){
            return res.status(401).json({message:"User not found!"})
        }
        const residence=await db.Residence.findByPk(req.params.residenceId)
        if(!residence){
            return res.status(401).json({message:"Resiedence Is not found!"})
        }


        const rate=await ratingService.deleteIssue(req.params)
        if(rate===null){
            return res.status(404).json({message:"Issue not found!"})
        }
        res.status(201).json({message:"Issue deleted"})
    }
    catch{
        res.status(500).json({message:"Server Error"})
    }
}




module.exports={
    getRatings,
    postRating,
    updateRating,
    deleteRating,
    deleteComment,
    deleteIssue
}
