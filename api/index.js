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
app.use("/api/auth", authRoute)

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "internal server error"
    return res.status(statusCode).json({
        sucess:false,
        statusCode,
        message
    })

})