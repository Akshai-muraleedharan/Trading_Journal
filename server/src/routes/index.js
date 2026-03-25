import express from "express"
import { v1Router } from "./v1Routes/v1Routes.js"

export const apiRouter = express.Router()

apiRouter.use("/v1", v1Router)