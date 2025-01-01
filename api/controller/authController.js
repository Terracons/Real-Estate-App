import User from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const signUp = async(req, res, next) => {
    try {
        // Log the request body to debug
        console.log('Request body:', req.body);

        const { username, email, password } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${[
                    !username && 'username',
                    !email && 'email',
                    !password && 'password'
                ].filter(Boolean).join(', ')}`
            });
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        
        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User created successfully"
        });
    } catch(error) {
        next(error);
    }
}

export const signin = async (req, res, next)=>{
    const{email, password} = req.body

    try {
        const validUser = await User.findOne({email})
        if (!validUser){
            res.status(401).json({
                success:false,
                message:"invalid user"
            })
        }

        const correctpassword = bcryptjs.compareSync(password, validUser.password)

        if(!correctpassword){
            res.status(401).json({
                success:false,
                message:"invalid credential"
            })

        }
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SIGN)
        const {password : pass, ...rest} = validUser._doc
        res
            .cookie("access_token", token, {httpOnly:true})
            .status(200)
            .json(rest)
    } catch (error) {
        next(error)
        
    }
    
    


}