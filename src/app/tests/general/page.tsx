'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import DefaultHeader from '@/components/DefaultHeader'
import ChatMessage from '@/components/ChatMessage'
import { generalTest } from '@/lib/data/generalTest'
import { useTelegramUser } from '@/lib/hooks/useTelegramUser'
import { useStats } from '@/lib/stores/statsStore'

const QUESTIONS_COUNT = 5

export default function GeneralChat() {
  const router = useRouter()
  const { userData } = useTelegramUser()
  const saveGeneral = useStats(s => s.saveGeneral)

  const questions = useMemo(() => {
    const selected: typeof generalTest = []
    const used = new Set<number>()
    while (selected.length < QUESTIONS_COUNT) {
      const i = Math.floor(Math.random() * generalTest.length)
      if (!used.has(i)) {
        used.add(i)
        selected.push(generalTest[i])
      }
    }
    return selected
  }, [])

  const [idx, setIdx] = useState(0)
  const [messages, setMessages] = useState([{ message: questions[0].question, isUser: false }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [threadId, setThreadId] = useState<string>()
  const [scores, setScores] = useState<number[]>([])
  const endRef = useRef<HTMLDivElement>(null)

  const ask = async (text: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/assistant/evaluate-general', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questions[idx].question,
          correctAnswer: questions[idx].answer,
          userAnswer: text,
          threadId
        })
      })
      const data = await res.json()
      setThreadId(data.threadId)
      setMessages(p => [...p, { message: data.feedback.trim(), isUser: false }])
      setScores(p => [...p, data.score])

      const nextIdx = idx + 1
      if (nextIdx < QUESTIONS_COUNT) {
        setIdx(nextIdx)
        setMessages(p => [...p, { message: questions[nextIdx].question, isUser: false }])
      } else {
        const total = scores.reduce((a, b) => a + b, data.score)
        const avgScore = Math.round(total / QUESTIONS_COUNT)
        const correct = scores.filter(s => s >= 7).length + (data.score >= 7 ? 1 : 0)
        const percent = Math.round((correct / QUESTIONS_COUNT) * 100)
        setMessages(p => [
          ...p,
          {
            message: `Тест завершён! Правильных ответов: ${correct}/${QUESTIONS_COUNT} (${percent} %). Средний балл: ${avgScore}/10.`,
            isUser: false
          }
        ])
        setCompleted(true)
        if (userData) saveGeneral(userData.id, percent, avgScore)
      }
    } catch {
      setMessages(p => [...p, { message: 'Ошибка сервера', isUser: false }])
    } finally {
      setLoading(false)
    }
  }

  const send = () => {
    if (loading || completed) return
    const text = input.trim()
    if (!text) return
    setMessages(p => [...p, { message: text, isUser: true }])
    setInput('')
    ask(text)
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
        <div className="flex flex-col items-center gap-4 p-4 border-t">
          <button
            onClick={() => router.push('/tests')}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            К&nbsp;тестам
          </button>
        </div>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault()
            send()
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
