import express from "express"
import { getNewAccessToken, logOutAccount, userLogin, userRegister } from "./user.controller.js"
import { verifyRefreshToken } from "../../middleware/refreshTokenVerify.js"
import { verifyToken } from "../../middleware/tokenVerify.js"

export const userRouter = express.Router()

userRouter.post("/register", userRegister)
userRouter.post("/login", userLogin)
userRouter.post("/logout", verifyToken, logOutAccount)
userRouter.get("/refresh-token", verifyRefreshToken, getNewAccessToken)