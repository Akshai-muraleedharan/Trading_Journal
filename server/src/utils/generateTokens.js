import jwt from "jsonwebtoken"
import { checkEnv } from "./checkEnv.js"


export const generateAccessToken = (payload) => {
    const accessTokenSecret = checkEnv("ACCESS_TOKEN")
    return jwt.sign({ id: payload.id, role: payload.role }, accessTokenSecret, { expiresIn: "15m" })
}
export const generateRefreshToken = (payload) => {
    const refreshTokenSecret = checkEnv("REFRESH_TOKEN")
    return jwt.sign({ id: payload.id, role: payload.role }, refreshTokenSecret, { expiresIn: "15d" })
}