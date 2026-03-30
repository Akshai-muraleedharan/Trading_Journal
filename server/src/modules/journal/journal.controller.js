import { createNewJournal, journals } from "../../service/index.js";
import { AppError } from "../../utils/customErrorHandler.js";
import { joiError } from "../../utils/joiError.js";
import { journalCreateValidation } from "./journalValidation.js"



export const createJournal = async (req, res, next) => {
    try {



        const { error, value } = journalCreateValidation.validate(req.body)

        const errorValue = joiError(error);

        if (errorValue) {
            return next(new AppError(JSON.stringify(errorValue), 400))
        }



        const { id: userId } = req.user

        createNewJournal(value, userId)

        res.status(201).json({ success: true, message: "Journal create successfully", })

    } catch (error) {
        next(error)
    }
}

export const getJournals = async (req, res, next) => {

    const { id: userId } = req.user
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5

    try {

        const payload = { userId, page, limit }

        const { data, totalCount, datalength, hasmore } = await journals(payload)

        res.status(200).json({ success: true, message: "Data fetched successfully", data, totalCount, datalength, hasmore })

    } catch (error) {
        next(error)
    }
}