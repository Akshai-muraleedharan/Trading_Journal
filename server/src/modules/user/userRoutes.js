import express from "express"
import { getNewAccessToken, userLogin, userRegister } from "./user.controller.js"
import { verifyRefreshToken } from "../../middleware/refreshTokenVerify.js"

export const userRouter = express.Router()

userRouter.post("/register", userRegister)
userRouter.post("/login", userLogin)
userRouter.get("/refresh-token", verifyRefreshToken, getNewAccessToken)