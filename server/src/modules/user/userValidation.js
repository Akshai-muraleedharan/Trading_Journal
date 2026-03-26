import Joi from "joi"



export const validateUserRegister = Joi.object({
    userName: Joi.string().min(3).max(10).required().messages({
        "string.empty": "User name is required",
        "string.min": "User name minimum 3 characters",
        "string.max": "User name must be less than or equal to 10 characters long"
    }),
    email: Joi.string().trim().lowercase().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }).required().messages({
        "string.empty": "Email is required",
        "string.email": "Enter valid Email"
    }),
    password: Joi.string().min(8)
        .max(30)
        .trim()
        .pattern(/[a-z]/)
        .pattern(/[A-Z]/)
        .pattern(/[0-9]/)
        .required()
        .messages({
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password cannot exceed 30 characters",
            "string.pattern.base": "Password must include uppercase, lowercase, and a number",
            "string.empty": "Password is required"
        })

})


export const userLoginValidation = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }).required().trim().lowercase().messages({
        "string.empty": "Email is required",
        "string.email": "Enter valid Email"
    }),
    password: Joi.string().required().messages({
        "string.empty": "Password is required"
    })
})