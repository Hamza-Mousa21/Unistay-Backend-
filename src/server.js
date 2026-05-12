

const express=require('express')
const app=express()
const db=require('../models')
const cors =require('cors')
const Ratingrouter=require('../routes/ratingRoutes')
const wishListRouter=require('../routes/wishListRoutes')
const studentRouter=require('../routes/studentAuthRoutes')
const ownerRouter=require('../routes/ownerAuthRoutes')
const residenceRouter=require('../routes/residenceRoutes')



const PORT=3000;


app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())


app.use('/residence/:residenceId/Ratings',Ratingrouter)
app.use('/residence/:residenceId/wishlist',wishListRouter)
app.use('/residence',residenceRouter)
app.use('/student',studentRouter)
app.use('/owner',ownerRouter)

app.listen(PORT,()=>{
    console.log("Server is running")
})