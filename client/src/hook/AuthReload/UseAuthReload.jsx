import React from 'react'
import { useAuthStore } from '../../store/AuthStore'

export const UseAuthReload = () => {

    const { user, token } = useAuthStore(state => state)

    const getAccessToken = () => {

    }

    return
}
