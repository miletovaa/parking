import { createStore } from 'zustand'
import { User } from '@/types/user'

export type MeState = {
    me: User | null
}

export type MeActions = {
    update: (me: User | null) => void
}

export type MeStore = MeState & MeActions

export const defaultInitState: MeState = {
    me: null
}

export const createMeStore = (
    initState: MeState = defaultInitState,
) => {
    return createStore<MeStore>()((set) => ({
        ...initState,
        update: (me: User | null) => set((state) => ({ ...state, me })),
    }))
}
