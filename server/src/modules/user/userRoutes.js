import express from "express"
import { userLogin, userRegister } from "./user.controller.js"

export const userRouter = express.Router()

userRouter.post("/register", userRegister)
userRouter.post("/login", userLogin)