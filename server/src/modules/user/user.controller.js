import { createUser } from "../../service/index.js";
import { AppError } from "../../utils/customErrorHandler.js";
import { validateUserRegister } from "./userValidation.js"

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