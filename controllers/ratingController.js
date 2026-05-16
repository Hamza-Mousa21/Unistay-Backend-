const ratingService=require('../services/ratingService')
 const db=require('../models')
const { response } = require('express')

const getRatings=async(req,res)=>{
    try{
        const residence=await db.Residence.findByPk(req.params.residenceId)
        if (!residence){
            return res.status(404).json({message:"Residence is not found!"})
        }  
        const rate=await ratingService.getRatings(req.params.residenceId)
        if(rate.length===0){
            return res.status(200).json({message:"No ratings yet"})
        }
        res.status(200).json(rate)
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"Server ERRRR"})
    }   
        
}


const postRating=async(req,res)=>{

    try{
        const student=await db.Student.findByPk(req.body.user_id)
        if(!student){
            return res.status(404).json({message:"User not found!"})
        }
        const residence=await db.Residence.findByPk(req.body.res_id)
        if(!residence){
            return res.status(404).json({message:"Resiedence Is not found!"})
        }
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
        const rating = await db.Rating.findByPk(req.params.id)

        if (!rating) {
            res.status(404).json({ message: "Rating not found" })
        }

        const residence = await db.Residence.findByPk(rating.res_id)
        if (!residence) {
            res.status(404).json({ message: "Residence not found" })
        }

        if (rating.user_id !== req.user.id) {
            return res.status(403).json({ message: "Access denied" })
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
          const rating = await db.Rating.findByPk(req.params.id)

        if (!rating) {
            res.status(404).json({ message: "Rating not found" })
        }

        const residence = await db.Residence.findByPk(rating.res_id)
        if (!residence) {
            res.status(404).json({ message: "Residence not found" })
        }

        if (rating.user_id !== req.user.id) {
            return res.status(403).json({ message: "Access denied" })
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


const deleteComment = async (req, res) => {
  try {
    const rating = await db.Rating.findByPk(req.params.id)

    if (!rating) {
      return res.status(404).json({ message: "Rating not found" })
    }

    const residence = await db.Residence.findByPk(rating.res_id)
    if (!residence) {
      return res.status(404).json({ message: "Residence not found" })
    }

    if (rating.user_id !== req.user.id) {
      return res.status(403).json({ message: "Access denied" })
    }

    const result = await ratingService.deleteComment(req.params)
    return res.status(200).json({ message: "Comment deleted successfully" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}


const deleteIssue=async(req,res)=>{
    try{
        const rating = await db.Rating.findByPk(req.params.id)

        if (!rating) {
        return res.status(404).json({ message: "Rating not found" })
        }


        const residence = await db.Residence.findByPk(rating.res_id)
        if (!residence) {
        return res.status(404).json({ message: "Residence not found" })
        }

        if (rating.user_id !== req.user.id) {
        return res.status(403).json({ message: "Access denied" })
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

const upsertStarCount = async (req, res) => {
    try {
        const residence = await db.Residence.findByPk(req.body.res_id)
        if (!residence) {
            return res.status(404).json({ message: "Residence not found" })
        }

        const student = await db.Student.findByPk(req.user.id)
        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }

        const rate = await ratingService.upsertStarCount(
            req.user.id,
            req.body.res_id,
            req.body.starCount
        )

        res.status(200).json(rate)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}


const getStudentStarCount = async (req, res) => {
    try {
        const { residenceId } = req.params

        const rating = await db.Rating.findOne({
            where: {
                user_id: req.user.id,
                res_id: residenceId,
                starCount: { [require('sequelize').Op.ne]: null }
            },
            order: [['rateDate', 'DESC']],  
        })

        if (!rating) {
            return res.status(404).json({ message: "No star rating found" })
        }

        return res.status(200).json({ starCount: rating.starCount })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

const getAverageStarCount = async (req, res) => {
    try {
        const { residenceId } = req.params

        const residence = await db.Residence.findByPk(residenceId)
        if (!residence) {
            return res.status(404).json({ message: "Residence not found" })
        }

        const result = await db.Rating.findOne({
            where: {
                res_id: residenceId,
                starCount: { [require('sequelize').Op.ne]: null }
            },
            attributes: [
                [db.sequelize.fn('AVG', db.sequelize.col('starCount')), 'average'],
                [db.sequelize.fn('COUNT', db.sequelize.col('starCount')), 'total']
            ],
            raw: true
        })

        return res.status(200).json({
            average: result.average ? parseFloat(result.average).toFixed(1) : null,
            total: parseInt(result.total)
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}




module.exports={
    getRatings,
    postRating,
    updateRating,
    deleteRating,
    deleteComment,
    deleteIssue,
    upsertStarCount,
    getStudentStarCount,
    getAverageStarCount
}
