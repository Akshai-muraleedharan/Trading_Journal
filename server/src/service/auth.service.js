import { User } from "../models/user.model.js";
import { AppError } from "../utils/customErrorHandler.js";


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