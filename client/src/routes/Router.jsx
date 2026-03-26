import { Route, Routes } from 'react-router-dom'
import { RootLayout } from '../layout/RootLayout'
import { lazy, Suspense } from 'react'

const LoginPage = lazy(() => import("../pages/RootPages/LoginPage"))
const SignupPage = lazy(() => import("../pages/RootPages/SignupPage"))

export const Router = () => {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-cente bg-r bg-[#BBC9C4] h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        }>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path='/' element={<LoginPage />} />
                    <Route path='/signup' element={<SignupPage />} />
                </Route>
            </Routes>
        </Suspense>
    )
}
