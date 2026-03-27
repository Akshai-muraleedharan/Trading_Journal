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