'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useParams, notFound, useRouter } from 'next/navigation'
import DefaultHeader from '@/components/DefaultHeader'
import ChatMessage from '@/components/ChatMessage'
import { menuData } from '@/app/menu/data'
import { saucesData } from '@/lib/utils/constants'
import type { MenuItem, Sauce } from '@/lib/types/menu'
import { useTelegramUser } from '@/lib/hooks/useTelegramUser'
import { useStats } from '@/lib/stores/statsStore'

export default function CompositionChat() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  if (!id) notFound()

  const category = menuData.categories.find(c => c.items.some(i => i.id === id))
  if (!category) notFound()
  const dish = category.items.find(i => i.id === id) as MenuItem

  const sauceList: Sauce[] = (dish.sauceIds ?? [])
    .map(sId => saucesData.find(s => s.id === sId))
    .filter((s): s is Sauce => Boolean(s))

  const sauceNames = sauceList.map(s => s.name)
  const sauceIngredients = sauceList.flatMap(s => s.ingredients)

  const initialPrompt =
    `Расскажи мне о составе блюда ${dish.name}` +
    (sauceNames.length ? ` и соуса ${sauceNames.join(', ')}` : '')

  const [messages, setMessages] = useState<{ message: string; isUser: boolean }[]>([
    { message: initialPrompt, isUser: false }
  ])
  const [input, setInput] = useState('')
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [threadId, setThreadId] = useState<string>()
  const endRef = useRef<HTMLDivElement>(null)

  const { userData } = useTelegramUser()
  const incTests = useStats(s => s.incTests)

  const sendToAssistant = async (answer: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/assistant/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dishName: dish.name,
          ingredients: dish.ingredients,
          sauceIngredients,
          userAnswer: answer,
          threadId
        })
      })
      const data = await res.json()
      setThreadId(data.threadId)
      setMessages(prev => [...prev, { message: data.feedback.trim(), isUser: false }])
      setCompleted(true)
      if (userData) incTests(userData.id)
    } catch {
      setMessages(prev => [...prev, { message: 'Ошибка сервера', isUser: false }])
    } finally {
      setLoading(false)
    }
  }

  const handleSend = () => {
    if (completed || loading) return
    const text = input.trim()
    if (!text) return
    setMessages(prev => [...prev, { message: text, isUser: true }])
    setInput('')
    sendToAssistant(text)
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="flex flex-col h-screen">
      <DefaultHeader />
      <div className="flex-1 overflow-auto p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((m, i) => (
            <ChatMessage key={i} message={m.message} isUser={m.isUser} />
          ))}
          {loading && !completed && (
            <ChatMessage
              key="loading"
              isUser={false}
              message={
                <span className="inline-flex items-center gap-2">
                  <img src="/my-loader.svg" alt="" className="h-12 w-12 animate-spin" />
                  Думаю…
                </span>
              }
            />
          )}
        </div>
        <div ref={endRef} />
      </div>
      {completed ? (
        <div className="flex p-4 border-t">
          <button
            onClick={() => router.back()}
            className="mx-auto px-4 py-2 bg-blue-600 text-white rounded"
          >
            К&nbsp;блюдам
          </button>
        </div>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault()
            handleSend()
          }}
          className="flex p-4 border-t"
        >
          <input
            className="flex-1 border rounded px-3 py-2 mr-2"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ваш ответ..."
            disabled={loading}
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? '...' : 'Отправить'}
          </button>
        </form>
      )}
    </div>
  )
}
