import express from "express"
import { signUp, signin ,  google } from "../controller/authController.js"
const router = express.Router()

router.post("/signup", signUp)
router.post("/signin", signin)
router.post("/google", google)
export default router