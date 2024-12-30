import User from "../models/userModel.js"
import bcrptjs from "bcryptjs"
export const signUp = async(req, res, next)=>{
    const{username, email, password}= req.body
    const hashpassword = bcrptjs.hashSync(password, 10)
    const newUser= new User({username, email, password:hashpassword})
    
    try{
        await newUser.save();
        res.status(201).json({sucess:true, message:"data save suceesfully"})

    }
    catch(error){
        next(error)
    }



}