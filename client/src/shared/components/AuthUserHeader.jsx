import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosInstance'
import { useAuthStore } from '../../store/AuthStore'

export const AuthUserHeader = () => {

    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { logOut } = useAuthStore()

    const userLogOut = async () => {
        try {
            setLoading(true)

            const response = await axiosInstance({
                method: "POST",
                url: "/user/logout",
                withCredentials: true
            })

            if (response?.data?.success) {
                logOut()
                navigate("/")
            }

        } catch (error) {
            logOut()
        } finally {
            setLoading(false)
        }
    }
    const handleLogOut = () => {
        userLogOut()
    }

    return (
        <header className="navbar p-5 lg:px-13 z-1 shadow-sm sticky top-0 bg-[#3A5A5F]">
            <div className="flex-1">
                <Link to={"/dashboard"} className="btn btn-ghost text-white text-xl">Trading Journal</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Link</a></li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="bg-base-100 rounded-t-none p-4">
                                <li>
                                    <Link className='p-0 hover:underline' to={"/dashboard/user/profile"}>
                                        Profile
                                    </Link>
                                </li>
                                <li onClick={handleLogOut} className='my-2'>Log out</li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </header>
    )
}
