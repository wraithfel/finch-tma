import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserStats {
  acceptedOrders: number
  askedQuestions: number
  passedTests: number
  answers: number
  totalScore: number
  avgScore: number
  correctPercent: number
}

const blankStats: UserStats = {
  acceptedOrders: 0,
  askedQuestions: 0,
  passedTests: 0,
  answers: 0,
  totalScore: 0,
  avgScore: 0,
  correctPercent: 0
}

type StatsStore = {
  byUser: Record<number, UserStats>
  getStats: (id: number) => UserStats
  incOrders: (id: number) => void
  incQuestions: (id: number) => void
  incTests: (id: number) => void
  saveGeneral: (id: number, percent: number, avg: number) => void
}

export const useStats = create<StatsStore>()(
  persist(
    (set, get) => ({
      byUser: {},
      getStats: id => get().byUser[id] ?? blankStats,
      incOrders: id =>
        set(state => {
          const s = { ...(state.byUser[id] ?? blankStats) }
          s.acceptedOrders++
          return { byUser: { ...state.byUser, [id]: s } }
        }),
      incQuestions: id =>
        set(state => {
          const s = { ...(state.byUser[id] ?? blankStats) }
          s.askedQuestions++
          return { byUser: { ...state.byUser, [id]: s } }
        }),
      incTests: id =>
        set(state => {
          const s = { ...(state.byUser[id] ?? blankStats) }
          s.passedTests++
          return { byUser: { ...state.byUser, [id]: s } }
        }),
      saveGeneral: (id, percent, avg) =>
        set(state => {
          const s = { ...(state.byUser[id] ?? blankStats) }
          s.answers++
          s.totalScore += avg
          s.avgScore = Math.round(s.totalScore / s.answers)
          s.correctPercent = percent
          return { byUser: { ...state.byUser, [id]: s } }
        })
    }),
    {
      name: 'finch-stats',
      version: 2,
      migrate: persisted => {
        const out: Record<number, UserStats> = {}
        if (persisted && typeof persisted === 'object' && 'byUser' in persisted) {
          for (const [k, v] of Object.entries<any>((persisted as any).byUser ?? {})) {
            out[Number(k)] = { ...blankStats, ...v }
          }
        }
        return { byUser: out }
      }
    }
  )
)
