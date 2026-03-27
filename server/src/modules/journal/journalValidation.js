import Joi from "joi"


export const journalCreateValidation = Joi.object({
    title: Joi.string().min(4).max(500).trim().allow("", null).messages({
        "string.min": "Title minimum 3 characters",
        "string.max": "Title must be less than or equal to 10 characters long"
    }),
    tradeDate: Joi.date().iso().required().messages({
        "date.base": "Enter a valid date",
        "any.required": "Trade Date Required"
    }),
    tradeAmount: Joi.number()
        .positive()
        .min(100)
        .max(100000)
        .precision(2)
        .required()
        .messages({
            "number.base": "Amount must be a valid number",
            "number.positive": "Amount must be greater than 0",
            "number.min": "Minimum trade amount is ₹100",
            "number.max": "Maximum trade amount is ₹100000",
            "number.precision": "Amount can have up to 2 decimal places",
            "any.required": "Amount is required"
        }),

    pnl: Joi.number().required().messages({
        "number.base": "PnL must be a valid number",
        "any.required": "PnL value is required"
    }),

    duration: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required().messages({
        "string.pattern.base": "Duration must be in HH:mm format",
        "any.required": "Duration is required"
    }),

    timeFrame: Joi.string()
        .valid("1m", "5m", "15m", "1H", "4H", "1D")
        .required()
        .messages({
            "any.only": "Invalid timeframe selected",
            "any.required": "Timeframe is required",
            "string.empty": "Timeframe cannot be empty"
        }),
    isProfit: Joi.string()
        .valid("PROFIT", "LOSS")
        .messages({
            "any.only": "Trade result must be either PROFIT or LOSS",
            "string.base": "Trade result must be a string"
        }),
    notes: Joi.string()
        .max(500)
        .allow("", null)
        .messages({
            "string.base": "Notes must be a valid text",
            "string.max": "Notes cannot exceed 500 characters"
        }),

    strategy: Joi.string()
        .min(3)
        .max(50)
        .messages({
            "string.base": "Strategy must be valid text",
            "string.min": "Strategy must be at least 3 characters",
            "string.max": "Strategy cannot exceed 50 characters"
        }),



})