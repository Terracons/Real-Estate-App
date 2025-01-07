import User from "../models/userModel.js"
import { errorHandler } from "../utilitis/error.js"
import bcryptjs from "bcryptjs"

const test = (req, res)=>{
    res.json({
        message:"api route is working"
    })

}

export default test
export const updateUser = async(req, res, next)=>{
    if(req.user.id !== req.param.id) return next(errorHandler(403, 'forbidden'))
    try {
        if(req.body.password)
        {
          req.body.password = bcryptjs.hashSync(req.body.password , 10)
        }
        const updatedUser = await  User.findByIdAndUpdate(req.param.id, {
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar,
            }
        }, {new:true})

        const {password, ...rest}= updatedUser._doc
        res
            .status(200)
            .json(rest)


        
    } catch (error) {
        next(error)
        
    }
}