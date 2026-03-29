import { create } from "zustand"
import { devtools } from "zustand/middleware"


export const useAuthStore = create(
    devtools((set) => ({
        user: null,
        token: null,
        isAuthenticated: false,

        loginAuth: (user, token) => set({ user, token, isAuthenticated: true }),
        pageRefreshAuth: (user, token) => set({ user, token, isAuthenticated: false }),
        logOut: () => set({ user: null, token: null, isAuthenticated: false })
    }))
)