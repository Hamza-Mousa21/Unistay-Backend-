const express=require('express')
const app=express()
const db=require('../models')
const cors=require('cors')
const Ratingrouter=require('../routes/ratingRoutes')
const wishListRouter=require('../routes/wishListRoutes')

const PORT=3000;


app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())


app.use('/Ratings',Ratingrouter)

app.use('/wishlist',wishListRouter)


app.listen(PORT,()=>{
    console.log("Server is running")
})


