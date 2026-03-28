import React from 'react'
import { Navigate, replace, useNavigate } from 'react-router-dom'

export const NotAuthorizedPage = () => {

    const navigate = useNavigate()

    const handleBackToPage = () => {
        navigate("/", replace)
    }

    return (
        <div className='h-screen flex justify-center flex-col items-center'>
            <div className='text-gray-800'>
                <h1 className="text-4xl font-bold">403</h1>
                <p className="mt-2 text-lg">
                    You don’t have permission to access this page.
                </p>
            </div>
            <button onClick={handleBackToPage} className='btn btn-neutral btn-sm mt-5'>Back to Login</button>
        </div>
    )
}
