import { checkEnv } from "../utils/checkEnv.js";


export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"

    const isDevEnv = checkEnv("NODE_ENV")

    const isDev = isDevEnv === "DEVELOPMENT"

    const response = {
        success: false,
        message: message,
    }

    if (isDev) {
        response.stack = err.stack
    }
    console.log(err.stack)
    console.log(message)

    return res.status(statusCode).json(response)
}  