import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserStats {
  acceptedOrders: number;
  askedQuestions: number;
  passedTests: number;
  avgScore: number;
}

interface StatsState {
  byUser: Record<number, UserStats>;
  incOrders: (userId: number) => void;
  incQuestions: (userId: number) => void;
}

export const useStats = create<StatsState>()(
  persist(
    (set, get) => ({
      byUser: {},

      incOrders: (userId) => {
        const prev = get().byUser[userId] ?? {
          acceptedOrders: 0,
          askedQuestions: 0,
          passedTests: 0,
          avgScore: 0,
        };
        set({
          byUser: {
            ...get().byUser,
            [userId]: { ...prev, acceptedOrders: prev.acceptedOrders + 1 },
          },
        });
      },

      incQuestions: (userId) => {
        const prev = get().byUser[userId] ?? {
          acceptedOrders: 0,
          askedQuestions: 0,
          passedTests: 0,
          avgScore: 0,
        };
        set({
          byUser: {
            ...get().byUser,
            [userId]: { ...prev, askedQuestions: prev.askedQuestions + 1 },
          },
        });
      },
    }),
    {
      name: 'finch-stats',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
