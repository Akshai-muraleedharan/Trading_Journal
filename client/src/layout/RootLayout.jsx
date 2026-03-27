import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

export const RootLayout = () => {

    const { pathname } = useLocation()

    const isSignupPage = pathname === "/signup"

    return (
        <div className='p-5 min-h-screen  flex flex-col lg:flex-row items-center justify-center bg-[#BBC9C4]'>
            <section className='text-gray-800 flex-2 w-full flex flex-col items-center justify-center'>
                <h1 className='text-3xl lg:text-5xl font-bold mb-4'>{isSignupPage ? " Start Your Trading Journey!" : "Welcome Back, Trader!"}</h1>
                <p className="text-lg text-center mb-1">{isSignupPage ? "Create an account to log every trade" : "Log in to track your trades effortlessly."}</p>
                <p className="text-lg mb-1 text-center ">{isSignupPage ? "Analyze your patterns and track your growth." : "Analyze your performance and improve your strategy."}</p>
                <p className="text-lg text-center ">{isSignupPage ? "Take control of your trading decisions today." : "Make smarter trading decisions every day."}</p>
            </section>
            <div className='flex-1 w-full'>
                <Outlet />
            </div>
        </div>
    )
}
