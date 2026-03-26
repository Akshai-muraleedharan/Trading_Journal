
export const joiError = (error) => {

    if (error) {
        const errors = {}
        error.details.forEach((detail) => {
            const key = detail.path[0]
            errors[key] = detail.message

        })
        const errorArray = Object.entries(errors).map(([key, message]) => ({ key, message, }));

        return errorArray
    }
    return null
}