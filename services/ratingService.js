const db=require('../models')

const getRatings=async(res_id)=>{
    const rate=await db.Rating.findAll({
        where:{res_id}
})
    return rate
}

const postRating = async(data) => {
    const rate = await db.Rating.create({
        user_id: data.user_id,
        res_id: data.res_id,
        rateDate: data.rateDate || new Date(), 
        starCount: data.starCount,
        comment: data.comment,
        issues: data.issues
    })
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

   if (rate.issues === null && rate.starCount === null) {
        await rate.destroy()
    }


}
const deleteIssue=async(data)=>{
      const rate =await db.Rating.findByPk(data.id)
    if(!rate){
        return null
    }

    await rate.update({
        issues:null
    })
    
    if (rate.comment === null && rate.starCount === null) {
        await rate.destroy()
    }



}




const updateRating=async(parameter,data)=>{
    const rate=await db.Rating.findByPk(parameter.id)
    if(!rate){
        return null;
    }
    
    await rate.update(data)
   

    return true
}


const upsertStarCount = async (user_id, res_id, starCount) => {
    const rate = await db.Rating.create({
        user_id,
        res_id,
        rateDate: new Date(),
        starCount,
        comment: null,
        issues: null
    })
    return rate
}

module.exports={
    getRatings,
    postRating,
    deleteRating,
    deleteComment,
    deleteIssue,
    updateRating,
    upsertStarCount

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