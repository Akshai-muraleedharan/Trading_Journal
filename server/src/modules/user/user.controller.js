import { generateNewAccessToken } from "../../service/common.service.js";
import { accountLogin, createUser } from "../../service/index.js";
import { checkEnv } from "../../utils/checkEnv.js";
import { AppError } from "../../utils/customErrorHandler.js";
import { joiError } from "../../utils/joiError.js";
import { userLoginValidation, validateUserRegister } from "./userValidation.js"

export const userRegister = async (req, res, next) => {
    try {

        const { error, value } = validateUserRegister.validate(req.body)

        const errorValue = joiError(error);

        if (errorValue) {
            return next(new AppError(JSON.stringify(errorValue), 400))
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
        const errorValue = joiError(error);



        if (errorValue) {
            return next(new AppError(JSON.stringify(errorValue), 400))
        }





        const payload = { ...value }

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

export const getNewAccessToken = async (req, res, next) => {
    try {
        const user = req.refreshToken
        console.log("hitted");

        const { userData, accessToken } = await generateNewAccessToken(user)
        console.log(userData);

        res.status(200).json({ success: true, message: "Access token created successfully", data: userData, accessToken })

    } catch (error) {
        next(error)
    }
}