'use client'

import React, { useCallback } from 'react'
import { Avatar } from '@telegram-apps/telegram-ui'
import DefaultHeader from '@/components/DefaultHeader'
import FullScreenLoader from '@/components/FullScreenLoader'
import StatCard from '@/components/StatCard'
import { useTelegramUser } from '@/lib/hooks/useTelegramUser'
import { useStats, UserStats } from '@/lib/stores/statsStore'

const defaultStats: UserStats = {
  acceptedOrders: 0,
  askedQuestions: 0,
  passedTests: 0,
  avgScore: 0,
}

export default function ProfilePage() {
  const { userData } = useTelegramUser()

  const selectStats = useCallback(
    (s: { byUser: Record<number, UserStats> }) =>
      userData ? s.byUser[userData.id] ?? defaultStats : defaultStats,
    [userData]
  )
  const stats = useStats(selectStats)

  if (!userData) return <FullScreenLoader />

  const metrics = [
    { label: 'Принято заказов', value: String(stats.acceptedOrders) },
    { label: 'Задано вопросов', value: String(stats.askedQuestions) },
    { label: 'Пройдено тестов', value: String(stats.passedTests) },
    { label: 'Средний балл теста', value: `${stats.avgScore} %` },
  ]

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--tg-theme-bg-color)]">
      <DefaultHeader />
      <main className="flex-1 overflow-y-auto p-4 space-y-10">
        <section className="flex flex-col items-center space-y-4">
          <Avatar
            size={96}
            src={userData.photo_url ?? ''}
            alt={userData.first_name}
            style={{
              borderRadius: '50%',
              border: '3px solid var(--tg-theme-button-color)',
            }}
          />
          <h1 className="text-2xl font-extrabold text-[var(--tg-theme-text-color)]">
            {userData.first_name}
            {userData.last_name ? ` ${userData.last_name}` : ''}
          </h1>
          <span className="text-sm text-[var(--tg-theme-hint-color)]">
            @{userData.username}
          </span>
        </section>
        <section className="grid grid-cols-2 gap-4">
          {metrics.map(m => (
            <StatCard key={m.label} label={m.label} value={m.value} />
          ))}
        </section>
      </main>
    </div>
  )
}
