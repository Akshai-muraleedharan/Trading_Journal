import { AppError } from "../../utils/customErrorHandler.js";
import { validateUserRegister } from "./userValidation.js"

export const userRegister = async (req, res, next) => {
    try {

        const { error, value } = validateUserRegister.validate(req.body)

        if (error) {
            return next(new AppError(error.details[0].message, 400))
        }


        console.log(value);


    } catch (error) {
        next(error)
    }
}