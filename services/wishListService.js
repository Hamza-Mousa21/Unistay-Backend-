const db=require('../models')

const getWishedList = async (user_id) => {
    return await db.WishList.findAll({
        where: { user_id },
        include: [
            {
                model: db.Residence,
                include: [
                    { model: db.ResidenceImage } 
                ]
            }
        ]
    })
    
}


const addToWishList = async (user_id, res_id) => {
    const wish = await db.WishList.create({
        liked: true,
        user_id,
        res_id
    })
    return wish
}


const removeFromWishList = async (user_id, res_id) => {
    const wish = await db.WishList.findOne({
        where: { user_id, res_id }
    })
    if (!wish) return null
    await wish.destroy()
    return true
}


module.exports={
    getWishedList,
    addToWishList,
    removeFromWishList
}
