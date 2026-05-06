const db=require('../models')

const getRatings=async()=>{
    const rate=await db.Rating.findAll()
    return rate
}

const postRating=async(data)=>{
// const {userId,resId,rateDate,starCount,comment,issues}
    const rate=await db.Rating.create({
        userId:data.userId,
        residentId:data.residentId,
        rateDate:data.rateDate,
        starCount:data.starCount,
        comment:data.comment,
        issues:data.issues
        
    })
    await rate.save()
    return rate
}

const deleteRating=async(data)=>{
    const rate=await db.Rating.findByPk(data.id)
    if (!rate){
        return null
    }
    await rate.destroy()

    return true;
}

const deleteComment=async(data)=>{
    const rate =await db.Rating.findByPk(data.id)
    if(!rate){
        return null
    }

    await rate.update({
        comment:null
    })


}
const deleteIssue=async(data)=>{
      const rate =await db.Rating.findByPk(data.id)
    if(!rate){
        return null
    }

    await rate.update({
        issues:null
    })



}




const updateRating=async(parameter,data)=>{
    const rate=await db.Rating.findByPk(parameter.id)
    if(!rate){
        return null;
    }
    
    await rate.update(data)
   

    return true
}


module.exports={
    getRatings,
    postRating,
    deleteRating,
    deleteComment,
    deleteIssue,
    updateRating

}





// const deleteStarCount=async()=>{
    
//   const rate =await db.Rating.findByPk(data.id)
//     if(!rate){
//         return null
//     }

//     await rate.update({
//         starCount:null
//     })


// }

// const updateComment=async(data)=>{
//     const rate=await db.Rating.findByPk(data.id)
//     if(!rate){
//         return null;
//     }
    
//     await rate.update({
//         comment:data.comment,

//     })
//     await rate.save()

//     return true
// }





// const updateStarCount=async(data)=>{
//     const rate=await db.Rating.findByPk(data.id)
//     if(!rate){
//         return null;
//     }
    
//     await rate.update(data)
//     await rate.save()

//     return true
// }


// const updateIssue=async(data)=>{
//     const rate=await db.Rating.findByPk(data.id)
//     if(!rate){
//         return null;
//     }
    
//     await rate.update({
//         issues:data.issues,

//     })
//     await rate.save()

//     return true
// }