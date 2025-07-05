'use client'

import React from 'react'

export default function StatCard({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className={
      `relative flex flex-col items-center justify-center rounded-2xl p-6
       bg-gradient-to-br from-indigo-500 to-indigo-700 bg-opacity-10
       shadow-lg overflow-hidden`
    }>
      <span
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-indigo-700"
      />

      <span className="text-3xl font-extrabold text-[var(--tg-theme-text-color)]">
        {value}
      </span>
      <span className="mt-1 text-sm font-medium text-[var(--tg-theme-text-color)]/70">
        {label}
      </span>
    </div>
  )
}
