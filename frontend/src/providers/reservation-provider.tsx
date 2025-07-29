'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type ReservationStore, createReservationStore } from '@/stores/reservation-store'

export type ReservationStoreApi = ReturnType<typeof createReservationStore>

export const ReservationStoreContext = createContext<ReservationStoreApi | undefined>(
  undefined,
)

export interface ReservationStoreProviderProps {
  children: ReactNode
}

export const ReservationStoreProvider = ({
  children,
}: ReservationStoreProviderProps) => {
  const storeRef = useRef<ReservationStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createReservationStore()
  }

  return (
    <ReservationStoreContext.Provider value={storeRef.current}>
      {children}
    </ReservationStoreContext.Provider>
  )
}

export const useReservationStore = <T,>(
  selector: (store: ReservationStore) => T,
): T => {
  const meStoreContext = useContext(ReservationStoreContext)

  if (!meStoreContext) {
    throw new Error(`useReservationStore must be used within ReservationStoreProvider`)
  }

  return useStore(meStoreContext, selector)
}
