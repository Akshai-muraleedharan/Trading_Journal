import mongoose, { Types } from "mongoose";
import { Journal } from "../models/journal.model.js";


export const createNewJournal = async (journalData, userId) => {
    try {

        const newJournal = new Journal({
            userId: userId,
            ...journalData
        })

        return await newJournal.save()

    } catch (error) {
        throw error
    }
}

export const journals = async (payload) => {
    try {

        const { userId, page, limit } = payload

        const results = await Journal.aggregate([
            {
                $facet: {
                    data: [
                        { $match: { userId: new Types.ObjectId(userId) } },
                        { $sort: { tradeDate: -1 } },
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        {
                            $project: {
                                _id: 1,
                                title: 1,
                                isProfit: 1,
                                notes: 1,
                                tradeDate: 1,
                                mode: 1
                            }
                        }
                    ],
                    totalCount: [{ $match: { userId: new Types.ObjectId(userId) } }, { $count: "count" }]
                }
            }
        ])

        const data = results[0]?.data || []
        const totalCount = results[0]?.totalCount[0]?.count || 0

        const datalength = data.length || 0

        const hasmore = (page * limit) < totalCount


        return { data, totalCount, datalength, hasmore }

    } catch (error) {
        throw error
    }
}