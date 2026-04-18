import {create} from 'zustand'
import type { Magnet } from '../types/index'


interface MagnetState {
    magnets: Magnet[]
    updateStatus: (id: string, status: 'bank' | 'fridge') => void
    updatePosition: (id: string, x: number | null, y: number | null) => void
    loadPack: (pack: Magnet[]) => void
}




export const useMagnetStore = create<MagnetState>((set) => ({
    magnets: [
        {id: '1', word: 'Hello', status: 'bank', x: null, y: null},
        {id: '2', word: 'World', status: 'bank', x: null, y: null},
        {id: '3', word: 'Greetings', status: 'bank', x: null, y: null},
        {id: '4', word: 'Mars', status: 'bank', x: null, y: null}
    ],
    updateStatus: (id: string, status: 'bank' | 'fridge') => {
        set((state) => ({
            magnets: state.magnets.map((magnet) => (
                magnet.id === id ? {...magnet, status} : magnet
            ))
        }))
    },
    updatePosition: (id: string, x:number | null, y:number | null) => {
        set((state) => ({
            magnets: state.magnets.map(magnet => (
                magnet.id === id ? {...magnet, x, y} : magnet
            ))
        }))
    },
    loadPack: (pack: Magnet[]) => {
        set({magnets: pack})
    }
}))