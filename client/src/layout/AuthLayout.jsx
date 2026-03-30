import React from 'react'
import { Outlet } from 'react-router-dom'
import { AuthUserHeader } from '../shared/components/AuthUserHeader'

export const AuthLayout = () => {
    return (
        <div className='bg-[#BBC9C4]'>

            <AuthUserHeader />
            <div className='p-5 lg:px-16 min-h-screen  flex flex-col  items-start justify-start '>
                <Outlet />
            </div>
        </div>
    )
}
