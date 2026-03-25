import express from "express"
import { userRouter } from "../../modules/user/userRoutes.js";

export const v1Router = express.Router();

v1Router.use("/user", userRouter)