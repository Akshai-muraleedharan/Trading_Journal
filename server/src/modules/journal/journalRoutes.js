import express from "express"
import { createJournal } from "./journal.controller.js"
import { verifyToken } from "../../middleware/tokenVerify.js"

export const journalRouter = express.Router()


journalRouter.post("/", verifyToken, createJournal)