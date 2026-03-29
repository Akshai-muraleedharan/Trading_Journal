import mongoose from "mongoose"
import { trades } from "../seed/journalSeed.js"

const journalSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    title: {
        type: String,
    },

    tradeDate: {
        type: Date,
        required: true,
    },
    tradeAmount: {
        type: Number,
        default: 0
    },
    pnl: {
        type: Number,
        default: 0
    },
    duration: {
        type: String,
    },

    timeFrame: {
        type: String,
        enum: ["1m", "5m", "15m", "1H", "4H", "1D"],
        required: true
    },

    isProfit: {
        type: String,
        enum: ["PROFIT", "LOSS"],
        default: "PROFIT"
    },
    mode: {
        type: String,
        enum: ["FOREX", "INDIAN_STOCK"],
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    strategy: {
        type: String,
        default: "Manual",
        trim: true
    },
    status: {
        type: String,
        enum: ["DRAFT", "PUBLISHED"],
        default: "DRAFT"
    }
}, { timestamps: true })





export const Journal = mongoose.model("Journal", journalSchema)


const uploadData = async () => {
    await Journal.insertMany(trades)
    console.log("upload successfully");

}

// uploadData()