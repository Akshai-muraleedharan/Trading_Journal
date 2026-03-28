import React from 'react'
import { Outlet } from 'react-router-dom'

export const GuestLayout = () => {
    return (
        <div className='p-5 min-h-screen  flex flex-col lg:flex-row items-center justify-center bg-[#BBC9C4]'>
            <Outlet />
        </div>
    )
}
