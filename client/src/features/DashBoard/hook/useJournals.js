import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../config/axiosInstance'

export const useJournals = () => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [loading, setLoading] = useState(true)
    const [journalData, setjournalData] = useState(null)

    const journals = async () => {
        try {
            setLoading(true)

            const response = await axiosInstance({
                method: "GET",
                url: `/journal?page=${page}&limit=${limit}`,
            })

            const { message: mess, success: succ, ...payload } = response?.data
            setjournalData(payload);

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        journals()
    }, [page, limit])

    return { journalData, setLimit, loading }
}
