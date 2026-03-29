import jwt from "jsonwebtoken"
import { checkEnv } from "../utils/checkEnv.js"
import { User } from "../models/user.model.js"
import { AppError } from "../utils/customErrorHandler.js"


export const verifyRefreshToken = async (req, res, next) => {
    const isDev = checkEnv("NODE_ENV") === "PRODUCTION"
    try {


        const { refreshToken } = req.cookies



        if (!refreshToken || refreshToken === undefined) {
            throw new AppError("Unauthorized", 401)
        }


        const decodeToken = jwt.verify(refreshToken, checkEnv("REFRESH_TOKEN"))

        const user = await User.findOne({ _id: decodeToken.id, role: decodeToken.role }).select("_id userName role")

        if (!user) {
            throw new AppError("Unauthorized", 401)
        }

        req.refreshToken = user

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