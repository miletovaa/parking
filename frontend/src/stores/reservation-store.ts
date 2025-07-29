import { createStore } from 'zustand'
import { Step, StepOneState, StepTwoState, StepThreeState } from '@/types/reservation'

export type ReservationState = {
    step: Step
    parking_id: number
    user_id?: number
} // TODO: combine "& StepOneState & StepTwoState & StepThreeState"

export type ReservationActions = {
    update: (data: StepOneState | StepTwoState | StepThreeState) => void
}

export type ReservationStore = ReservationState & ReservationActions

export const defaultInitState: ReservationState = {
    step: 1,
    parking_id: 1,
    // todo: set user_id
}

export const createReservationStore = (
    initState: ReservationState = defaultInitState,
) => {
    return createStore<ReservationStore>()((set) => ({
        ...initState,
        update: (data: StepOneState | StepTwoState | StepThreeState) => set((state) => ({ ...state, data })),
    }))
}
