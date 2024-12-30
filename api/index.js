import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./router/userRouter.js";
import authRoute from "./router/authRoute.js"

dotenv.config()


mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("connected to database");})
.catch((error)=>{console.log(error);})

const app = express()
app.use(express.json())


app.listen(3000, ()=>{
    console.log("app is running on 3000");
})


app.use("/api/user", userRouter)
app.use("/auth/user", authRoute)