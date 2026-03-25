import mongoose from "mongoose";


export const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri)
        console.log("mongoose connected successfully")
    } catch (error) {
        error.log(error)
        process.exit(1)
    }
}