import jwt from "jsonwebtoken"
import { checkEnv } from "../utils/checkEnv.js"
import { AppError } from "../utils/customErrorHandler.js"
import { User } from "../models/user.model.js"

export const verifyToken = async (req, res, next) => {

    const isDev = checkEnv("NODE_ENV") === "PRODUCTION"

    try {

        const authHeader = req.headers.authorization


        if (!authHeader || authHeader === undefined || !authHeader.startsWith("Bearer")) {
            throw new AppError("Unauthorized", 401)
        }

        const token = authHeader.split(" ")[1];

        const decodeToken = jwt.verify(token, checkEnv("ACCESS_TOKEN"))
        console.log(decodeToken);

        const user = await User.findOne({ _id: decodeToken.id, role: decodeToken.role }).select("_id userName role")

        console.log(user);

        if (!user) {
            throw new AppError("Unauthorized", 401)
        }

        console.log("authHeader", authHeader);
        req.user = user

        next()
    } catch (error) {

        if (error.name === "JsonWebTokenError") {
            throw new AppError(isDev ? "Unauthorized" : error.message, 401)
        }

        if (error.name === "TokenExpiredError") {
            throw new AppError(isDev ? "Unauthorized" : error.message, 401)
        }

        next(error)
    }
}