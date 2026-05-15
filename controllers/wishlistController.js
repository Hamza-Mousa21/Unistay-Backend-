const wishlistService = require('../services/wishListService')
const db = require('../models')

const getAllWishedList = async (req, res) => {
    try {
        const student = await db.Student.findByPk(req.user.id)
        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }

        const wish = await wishlistService.getWishedList(req.user.id)
        if (wish.length === 0) {
            return res.status(200).json({ message: "No liked items to show" })
        }

        res.status(200).json(wish)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

const getWishlistByResId = async (req, res) => {
    try {
        const student = await db.Student.findByPk(req.user.id)
        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }

        const wish = await db.WishList.findOne({
            where: {
                user_id: req.user.id,
                res_id: req.params.res_id
            }
        })

        res.status(200).json({ isWishlisted: wish !== null })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

const addToWishlist = async (req, res) => {
    try {
        const student = await db.Student.findByPk(req.user.id)
        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }

        const residence = await db.Residence.findByPk(req.params.res_id)
        if (!residence) {
            return res.status(404).json({ message: "Residence not found" })
        }

        const wish = await wishlistService.addToWishList(req.user.id, req.params.res_id)
        res.status(201).json({ message: "Residence liked" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

const removeFromWishlist = async (req, res) => {
    try {
        const student = await db.Student.findByPk(req.user.id)
        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }

        const residence = await db.Residence.findByPk(req.params.res_id)
        if (!residence) {
            return res.status(404).json({ message: "Residence not found" })
        }

        const wish = await wishlistService.removeFromWishList(req.user.id, req.params.res_id)
        if (wish === null) {
            return res.status(404).json({ message: "Wishlist item not found" })
        }

        res.status(200).json({ message: "Residence unliked" })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

module.exports = {
    addToWishlist,
    removeFromWishlist,
    getAllWishedList,
    getWishlistByResId
}