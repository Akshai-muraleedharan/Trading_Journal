import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/customErrorHandler.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";


export const createUser = async (userData) => {

    try {
        const { userName, email, password } = userData

        const user = await User.findOne({ email }).select("_id")
        if (user) {
            throw new AppError("Account Already exist", 409)
        }


        const newUser = new User({
            userName,
            email,
            password

        })

        return await newUser.save()
    } catch (error) {
        console.log("auth error", error);
        throw error

    }

}

export const accountLogin = async (userData) => {
    try {
        const { email, password, role } = userData

        const user = await User.findOne({ email: email, role: role }).select("email userName password role")


        if (!user) {
            throw new AppError("Login failed. Please check your credentials", 401)
        }


        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new AppError("Login failed. Please check your credentials", 401)
        }

        const accessPayload = { _id: user?._id, role: user?.role }

        const accessToken = generateAccessToken(accessPayload)
        const refreshToken = generateRefreshToken(accessPayload)



        const { password: pass, ...rest } = user._doc


        return { rest, accessToken, refreshToken }

    } catch (error) {
        throw error
    }
}