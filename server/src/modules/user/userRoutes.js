import express from "express"
import { userRegister } from "./user.controller.js"

export const userRouter = express.Router()

userRouter.post("/register", userRegister)