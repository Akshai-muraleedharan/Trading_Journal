import { accountLogin, createUser } from "../../service/index.js";
import { checkEnv } from "../../utils/checkEnv.js";
import { AppError } from "../../utils/customErrorHandler.js";
import { userLoginValidation, validateUserRegister } from "./userValidation.js"

export const userRegister = async (req, res, next) => {
    try {

        const { error, value } = validateUserRegister.validate(req.body)

        if (error) {
            return next(new AppError(error.details[0].message, 400))
        }


        await createUser(value)

        res.status(201).json({ success: true, message: "Account Registered successfully" })
    } catch (error) {
        next(error)
    }
}


export const userLogin = async (req, res, next) => {
    try {
        const { error, value } = userLoginValidation.validate(req.body)

        if (error) {
            return next(new AppError(error.details[0].message, 400))
        }



        const payload = { ...value, role: "USER" }

        const { rest, accessToken, refreshToken } = await accountLogin(payload)

        const isDevEnv = checkEnv("NODE_ENV")


        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: isDevEnv === "PRODUCTION",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ success: true, message: "Login Successfully", data: rest, accessToken })
    } catch (error) {
        console.log(error);

        next(error)
    }
}