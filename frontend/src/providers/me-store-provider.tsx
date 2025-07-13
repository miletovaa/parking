'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type MeStore, createMeStore } from '@/stores/me-store'

export type MeStoreApi = ReturnType<typeof createMeStore>

export const MeStoreContext = createContext<MeStoreApi | undefined>(
  undefined,
)

export interface MeStoreProviderProps {
  children: ReactNode
}

export const MeStoreProvider = ({
  children,
}: MeStoreProviderProps) => {
  const storeRef = useRef<MeStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createMeStore()
  }

  return (
    <MeStoreContext.Provider value={storeRef.current}>
      {children}
    </MeStoreContext.Provider>
  )
}

export const useMeStore = <T,>(
  selector: (store: MeStore) => T,
): T => {
  const meStoreContext = useContext(MeStoreContext)

  if (!meStoreContext) {
    throw new Error(`useMeStore must be used within MeStoreProvider`)
  }

  return useStore(meStoreContext, selector)
}
