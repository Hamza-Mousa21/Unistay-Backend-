require("dotenv").config();
const express = require("express");
const app = express();
const db = require("../models");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const Ratingrouter = require("../routes/ratingRoutes");
const wishListRouter = require("../routes/wishListRoutes");
const studentRouter = require("../routes/studentAuthRoutes");
const ownerRouter = require("../routes/ownerAuthRoutes");
const residenceRouter = require("../routes/residenceRoutes");
const setupSwagger = require("../swagger.js")

const PORT = 3000;


fs.mkdirSync("uploads/residences", { recursive: true });


app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());


app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

setupSwagger(app)



app.use('/Ratings',Ratingrouter)
app.use('/wishlist',wishListRouter)
app.use('/residence',residenceRouter)
app.use('/student',studentRouter)
app.use('/owner',ownerRouter)

app.listen(PORT, () => {
  console.log("Server is running");
});

