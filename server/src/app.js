import express from "express"
import { apiRouter } from "./routes/index.js"

const app = express()

app.use(express.json())

app.use("/api", apiRouter)

app.use('/api/health', (req, res) => {
    res.json({ message: "Server health is OK" })
})

app.use((req, res) => {
    const path = req.url
    res.status(404).json({ success: false, message: `Route not found ${path || ""}` })
})

export default app
