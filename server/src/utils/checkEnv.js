import dotenv from "dotenv"
dotenv.config()

export const checkEnv = (envName) => {
    const isExist = process.env[envName]

    if (!isExist) {
        throw new Error(`${envName} : is not exist in env file`)
    }

    return isExist

}