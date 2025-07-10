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

type PersistedState = {
  byUser?: Record<string, unknown>
}

const VERSION = 2

export const useStats = create<StatsStore>()(
  persist(
    (set, get) => ({
      byUser: {},

      getStats: id => get().byUser[id] ?? blankStats,

      incOrders: id =>
        set(state => {
          const s = { ...(state.byUser[id] ?? blankStats) }
          s.acceptedOrders += 1
          return { byUser: { ...state.byUser, [id]: s } }
        }),

      incQuestions: id =>
        set(state => {
          const s = { ...(state.byUser[id] ?? blankStats) }
          s.askedQuestions += 1
          return { byUser: { ...state.byUser, [id]: s } }
        }),

      incTests: id =>
        set(state => {
          const s = { ...(state.byUser[id] ?? blankStats) }
          s.passedTests += 1
          return { byUser: { ...state.byUser, [id]: s } }
        }),

      saveGeneral: (id, percent, avg) =>
        set(state => {
          const s = { ...(state.byUser[id] ?? blankStats) }
          s.answers += 1
          s.totalScore += avg
          s.avgScore = Math.round(s.totalScore / s.answers)
          s.correctPercent = percent
          return { byUser: { ...state.byUser, [id]: s } }
        })
    }),
    {
      name: 'finch-stats',
      version: VERSION,
      migrate: (persisted: unknown) => {
        const byUser: Record<number, UserStats> = {}

        if (
          typeof persisted === 'object' &&
          persisted !== null &&
          'byUser' in persisted
        ) {
          const raw = (persisted as PersistedState).byUser ?? {}

          Object.entries(raw).forEach(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
              const partial = value as Partial<UserStats>
              byUser[Number(key)] = { ...blankStats, ...partial }
            }
          })
        }

        return { byUser }
      }
    }
  )
)
