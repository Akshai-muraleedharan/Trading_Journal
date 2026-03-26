import React, { useEffect } from 'react'
import { axiosInstance } from '../../../config/axiosInstance'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {

    const [error, setError] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const userLogin = async (userData) => {
        try {
            setLoading(true)
            const response = await axiosInstance({
                method: "POST",
                url: "/user/login",
                data: userData
            })

            if (response?.data?.success) {
                navigate("/signup")
            }

        } catch (error) {
            setError(JSON.parse(error.response?.data?.message));
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (error.length === 0) return
        const errorTimeOut = setTimeout(() => {
            setError([])
        }, 2000)

        return () => clearTimeout(errorTimeOut)
    }, [error])


    return { userLogin, error, loading }
}
