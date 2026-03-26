import app from "./app.js"
import { checkEnv } from "./utils/checkEnv.js"
import { connectDB } from "./config/db.js"
import { errorHandler } from "./middleware/errorHandler.js"



const port = checkEnv("PORT") || 3006

const startServer = async () => {
    await connectDB(checkEnv("MONGO_URI"))

    app.listen(port, () => {
        console.log("Server connected successfully", port)
    })
}

startServer()

app.use(errorHandler)