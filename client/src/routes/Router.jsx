import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RootLayout } from '../layout/RootLayout'
import { LoginPage } from '../pages/index'
import { SignupPage } from '../pages/RootPages/SignupPage'


export const Router = () => {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route index={true} path='/' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
            </Route>
        </Routes>
    )
}
