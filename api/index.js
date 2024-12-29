import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()


mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("connected to database");})
.catch((error)=>{console.log(error);})

const app = express()



app.listen(3000, ()=>{
    console.log("app is running on 3000");
})