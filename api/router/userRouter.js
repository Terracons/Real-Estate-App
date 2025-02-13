import express from "express"
import test, { updateUser } from "../controller/userController.js"
import { verifyToken } from "../utilitis/verifyToken.js"

const router = express.Router()


router.get("/test", test)
router.post("/update/:id",verifyToken, updateUser)

export default router