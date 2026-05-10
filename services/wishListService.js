const db=require('../models')

const getWishedList=async()=>{
    const wish=await db.WishList.findAll()
    return wish
}


const addToWishList=async(Data)=>{
    const wish =await db.WishList.create({
        liked:Data.liked,
        userId:Data.userId,
        residentId:Data.residentId
    })
    return wish
}

const removeFromWishList=async(Data)=>{
    const wish=await db.WishList.findByPk(Data.id)
    if(!wish){
        return null
    }
    await wish.destroy()
    return true

}


module.exports={
    getWishedList,
    addToWishList,
    removeFromWishList
}
