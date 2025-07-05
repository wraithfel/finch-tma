'use client'

import React from 'react'
import { Avatar } from '@telegram-apps/telegram-ui'
import DefaultHeader from '@/components/DefaultHeader'
import FullScreenLoader from '@/components/FullScreenLoader'
import StatCard from '@/components/StatCard'
import { useTelegramUser } from '@/lib/hooks/useTelegramUser'

export default function ProfilePage() {
  const { userData } = useTelegramUser()

  if (!userData) return <FullScreenLoader />

  const stats = [
    { label: 'Принято заказов',    value: '42',      colors: 'from-blue-400 to-blue-600' },
    { label: 'Задано вопросов',    value: '87',      colors: 'from-purple-400 to-purple-600' },
    { label: 'Пройдено тестов',    value: '9 / 12',  colors: 'from-green-400 to-green-600' },
    { label: 'Средний балл теста', value: '86 %',    colors: 'from-pink-400 to-pink-600' },
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
            {userData.first_name}{userData.last_name ? ` ${userData.last_name}` : ''}
          </h1>
          <span className="text-sm text-[var(--tg-theme-hint-color)]">
            @{userData.username}
          </span>
        </section>

        <section className="grid grid-cols-2 gap-4">
          {stats.map(s => (
            <StatCard
              key={s.label}
              label={s.label}
              value={s.value}
            />
          ))}
        </section>
      </main>
    </div>
  )
}
