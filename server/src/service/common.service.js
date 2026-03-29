import { User } from "../models/user.model.js";
import { generateAccessToken } from "../utils/generateTokens.js"


export const generateNewAccessToken = async (userCredential) => {
    try {

        const tokenPayload = { id: userCredential.id, role: userCredential.role };

        const userData = await User.findOne({ _id: userCredential.id, role: userCredential.role }).select("email userName role ")

        const accessToken = generateAccessToken(tokenPayload);

        return { userData, accessToken }

    } catch (error) {
        throw error
    }
} 