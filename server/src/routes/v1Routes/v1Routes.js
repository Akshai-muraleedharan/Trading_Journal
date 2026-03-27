import express from "express"
import { userRouter } from "../../modules/user/userRoutes.js";
import { journalRouter } from "../../modules/journal/journalRoutes.js";
import { verifyToken } from "../../middleware/tokenVerify.js";

export const v1Router = express.Router();

v1Router.use("/user", userRouter)
v1Router.use("/journal", journalRouter)



v1Router.use("/test-token", verifyToken, async (req, res) => {
    res.send(req.user)
})