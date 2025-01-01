import User from "../models/userModel.js"
import bcryptjs from "bcryptjs"

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