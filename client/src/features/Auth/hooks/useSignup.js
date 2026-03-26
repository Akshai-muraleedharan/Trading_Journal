import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../config/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useSignup = () => {

    const [error, setError] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const userRegister = async (userData) => {
        try {
            setLoading(true)
            const response = await axiosInstance({
                method: "POST",
                url: "/user/register",
                data: userData
            })

            if (response?.data?.success) {
                toast.success(response?.data?.message)
            }

            if (response?.data?.success) {
                navigate("/")
            }

        } catch (error) {
            setError(JSON.parse(error.response?.data?.message));
            console.log(error?.response?.data)
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



    return { userRegister, error, loading }
}
