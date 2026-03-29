import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../config/axiosInstance'
import { useAuthStore } from '../store/AuthStore'
import { useLocation } from 'react-router-dom'

export const useAuthReload = () => {

    const [loading, setLoading] = useState(true)




    const { loginAuth, user, token, pageRefreshAuth } = useAuthStore()
    const refresh = async () => {
        try {
            setLoading(true)

            const response = await axiosInstance({
                method: "GET",
                url: "/user/refresh-token",
                withCredentials: true
            })

            if (response?.data?.success) {
                loginAuth(response?.data?.data, response?.data?.accessToken)
            }

        } catch (error) {
            pageRefreshAuth(null, null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user && token) return
        refresh()
    }, [user, token])

    return loading
} 
