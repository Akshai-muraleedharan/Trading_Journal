import express from "express"
import { apiRouter } from "./routes/index.js"
import cors from "cors"
import { checkEnv } from "./utils/checkEnv.js";
import cookieParser from "cookie-parser"

const app = express()

const corsOption = {
    origin: checkEnv("FRONTEND_URL"),
    credentials: true
};

// Middlewares
app.use(cors(corsOption))
app.use(cookieParser())
app.use(express.json())


app.use("/api", apiRouter)

app.use('/api/health', (req, res) => {
    res.status(200).json({ message: "Server health is OK" })
})

app.use((req, res) => {
    const path = req.url
    res.status(404).json({ success: false, message: `Route not found ${path || ""}` })
})

export default app
