'use client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface UserStats {
  acceptedOrders: number
  askedQuestions: number
  passedTests: number
  avgScore: number
}

interface StatsState {
  byUser: Record<number, UserStats>
  incOrders: (userId: number) => void
  incQuestions: (userId: number) => void
  incTests: (userId: number) => void
  setAvgScore: (userId: number, score: number) => void
}

const defaultStats: UserStats = {
  acceptedOrders: 0,
  askedQuestions: 0,
  passedTests: 0,
  avgScore: 0,
}

function ensure(map: Record<number, UserStats>, id: number) {
  return map[id] ?? { ...defaultStats }
}

export const useStats = create<StatsState>()(
  persist(
    (set) => ({
      byUser: {},
      incOrders: (id) =>
        set((state) => {
          const stats = ensure(state.byUser, id)
          stats.acceptedOrders += 1
          return { byUser: { ...state.byUser, [id]: stats } }
        }),
      incQuestions: (id) =>
        set((state) => {
          const stats = ensure(state.byUser, id)
          stats.askedQuestions += 1
          return { byUser: { ...state.byUser, [id]: stats } }
        }),
      incTests: (id) =>
        set((state) => {
          const stats = ensure(state.byUser, id)
          stats.passedTests += 1
          return { byUser: { ...state.byUser, [id]: stats } }
        }),
      setAvgScore: (id, score) =>
        set((state) => {
          const stats = ensure(state.byUser, id)
          stats.avgScore = score
          return { byUser: { ...state.byUser, [id]: stats } }
        }),
    }),
    {
      name: 'stats-storage',
      storage: createJSONStorage(() => localStorage), 
    }
  )
)
