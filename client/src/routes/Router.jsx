import { Route, Routes } from 'react-router-dom'
import { RootLayout } from '../layout/RootLayout'
import { lazy, Suspense } from 'react'
import { LoaderUi } from '../shared/Common/LoaderUi'
import { JournalDashBorad } from '../pages/AuthPages/JournalDashBorad'
import { AuthLayout } from '../layout/AuthLayout'
import { ProtectedRoute } from './ProtectedRoutes/ProtectedRoute'
import { userRole } from '../constants/userRoles'
// import { NotAuthorizedPage } from '../pages/RootPages/NotAuthorizedPage'
import { GuestLayout } from '../layout/GuestLayout'


const LoginPage = lazy(() => import("../pages/RootPages/LoginPage"))
const SignupPage = lazy(() => import("../pages/RootPages/SignupPage"))

const NotAuthorizedPage = lazy(() => import("../pages/RootPages/NotAuthorizedPage"))

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

                <Route element={<GuestLayout />}>
                    <Route path='/403' element={<NotAuthorizedPage />} />
                </Route>

                <Route element={<ProtectedRoute role={[userRole.ADMIN, userRole.USER]} />}>
                    <Route path='/dashboard' element={<AuthLayout />}>
                        <Route index={true} element={<JournalDashBorad />} />
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    )
}
