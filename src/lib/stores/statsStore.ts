'use client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface UserStats {
  acceptedOrders: number
  askedQuestions: number
  passedTests: number
  answers: number
  totalScore: number
  avgScore: number
  correctPercent: number
}

interface StatsState {
  saveGeneral: (userId: number, correctPercent: number, avgScore: number) => void
  byUser: Record<number, UserStats>
  incOrders: (userId: number) => void
  incQuestions: (userId: number) => void
  incTests: (userId: number) => void
  addScore: (userId: number, score: number) => void
}

const defaultStats: UserStats = {
  acceptedOrders: 0,
  askedQuestions: 0,
  passedTests: 0,
  answers: 0,
  totalScore: 0,
  avgScore: 0,
  correctPercent: 0
}

function ensure(map: Record<number, UserStats>, id: number) {
  return map[id] ?? { ...defaultStats }
}

export const useStats = create<StatsState>()(
  persist(
    set => ({
      byUser: {},
      incOrders: id =>
        set(state => {
          const stats = ensure(state.byUser, id)
          stats.acceptedOrders += 1
          return { byUser: { ...state.byUser, [id]: stats } }
        }),
      incQuestions: id =>
        set(state => {
          const stats = ensure(state.byUser, id)
          stats.askedQuestions += 1
          return { byUser: { ...state.byUser, [id]: stats } }
        }),
      incTests: id =>
        set(state => {
          const stats = ensure(state.byUser, id)
          stats.passedTests += 1
          return { byUser: { ...state.byUser, [id]: stats } }
        }),
      addScore: (id, score) =>
        set(state => {
          const stats = ensure(state.byUser, id)
          stats.answers += 1
          stats.totalScore += score
          stats.avgScore = stats.totalScore / stats.answers
          return { byUser: { ...state.byUser, [id]: stats } }
        }),
      saveGeneral: (id, correctPercent, avgScore) =>
        set(state => {
          const stats = ensure(state.byUser, id)
          stats.correctPercent = correctPercent
          stats.avgScore = avgScore
          return { byUser: { ...state.byUser, [id]: stats } }
        })
    }),
    {
      name: 'stats-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

