import { create } from 'zustand'

interface AuthState {
    token: string | null
    login: (token: string) => void
    logout: () => void
}



export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem('token'),
    login: (token: string) => {
        localStorage.setItem('token', token)
        set({token})
    },
    logout: () => {
        set({token: null})
        localStorage.removeItem('token')
    }
}))