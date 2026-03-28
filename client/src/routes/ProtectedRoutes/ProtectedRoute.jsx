import React from 'react'
import { useAuthStore } from '../../store/AuthStore'
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ role }) => {

    const { isAuthenticated, user } = useAuthStore(state => state)

    if (!isAuthenticated && !user) {
        return <Navigate to={"/"} />
    }

    console.log(role.includes(user?.role));

    if (role.includes(user?.role) === false) {
        return <Navigate to={"/403"} replace />
    }

    return <Outlet />
}
