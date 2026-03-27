import { Route, Routes } from 'react-router-dom'
import { RootLayout } from '../layout/RootLayout'
import { lazy, Suspense } from 'react'
import { LoaderUi } from '../shared/Common/LoaderUi'

const LoginPage = lazy(() => import("../pages/RootPages/LoginPage"))
const SignupPage = lazy(() => import("../pages/RootPages/SignupPage"))

export const Router = () => {
    return (
        <Suspense fallback={
            <LoaderUi />
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
