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
  ensureUser: (id: number) => void
  getStats: (id: number) => UserStats
  incOrders: (id: number) => void
  incQuestions: (id: number) => void
  incTests: (id: number) => void
  saveGeneral: (id: number, correctPercent: number, avgScore: number) => void
}

export const useStats = create<StatsStore>()(
  persist(
    (set, get) => ({
      byUser: {},
      ensureUser: id =>
        set(state =>
          state.byUser[id]
            ? {}
            : { byUser: { ...state.byUser, [id]: { ...blankStats } } }
        ),
      getStats: id => {
        const { byUser } = get()
        return byUser[id] ?? blankStats
      },
      incOrders: id =>
        set(state => {
          const stats = { ...blankStats, ...state.byUser[id] }
          stats.acceptedOrders += 1
          return { byUser: { ...state.byUser, [id]: stats } }
        }),
      incQuestions: id =>
        set(state => {
          const stats = { ...blankStats, ...state.byUser[id] }
          stats.askedQuestions += 1
          return { byUser: { ...state.byUser, [id]: stats } }
        }),
      incTests: id =>
        set(state => {
          const stats = { ...blankStats, ...state.byUser[id] }
          stats.passedTests += 1
          return { byUser: { ...state.byUser, [id]: stats } }
        }),
      saveGeneral: (id, correctPercent, avgScore) =>
        set(state => {
          const stats = { ...blankStats, ...state.byUser[id] }
          stats.answers += 1
          stats.totalScore += avgScore
          stats.avgScore = Math.round(stats.totalScore / stats.answers)
          stats.correctPercent = correctPercent
          return { byUser: { ...state.byUser, [id]: stats } }
        })
    }),
    {
      name: 'finch-stats',
      version: 1,
      migrate: persisted => {
        if (!persisted || typeof persisted !== 'object') return { byUser: {} }
        if (!('byUser' in persisted)) return { byUser: {} }
        const byUser: Record<number, UserStats> = {}
        for (const [k, v] of Object.entries((persisted as any).byUser || {})) {
          byUser[Number(k)] = { ...blankStats, ...(v as UserStats) }
        }
        return { byUser }
      }
    }
  )
)

