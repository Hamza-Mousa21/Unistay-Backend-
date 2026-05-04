const express=require('express')
const app=express()
const db=require('../models')
const Ratingrouter=require('../routes/ratingRoutes')
const wishListRouter=require('../routes/wishListRoutes')

const PORT=3000;



app.use(express.json())


app.use('/Ratings',Ratingrouter)

app.use('/wishlist',wishListRouter)


app.listen(PORT,()=>{
    console.log("Server is running")
})


