'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import DefaultHeader from '@/components/DefaultHeader';
import ChatMessage  from '@/components/ChatMessage';
import { menuData } from '@/app/menu/data';
import type { MenuItem, Sauce } from '@/lib/types/menu';

export default function CompositionChat() {
  const { id } = useParams<{ id: string }>();
  if (!id) notFound();

  const dish: MenuItem | undefined = menuData.categories
    .flatMap(c => c.items)
    .find(i => i.id === id);
  if (!dish) notFound();

  const sauceIngredients: string[] = (dish.sauceIds ?? []).flatMap(sId => {
    const sauce = (menuData as { sauces?: Sauce[] }).sauces?.find(s => s.id === sId);
    return sauce ? sauce.ingredients : [];
  });

  const [messages, setMessages] = useState<{ sender: 'bot' | 'user'; text: string }[]>([
    { sender: 'bot', text: `Расскажи мне о составе блюда ${dish.name}` }
  ]);
  const [input, setInput] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | undefined>();
  const endRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const sendToAssistant = async (answer: string) => {
    setLoading(true);
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
    });
    const data = await res.json();
    setThreadId(data.threadId);
    setMessages(prev => [...prev, { sender: 'bot', text: data.feedback }]);
    setCompleted(true);
    setLoading(false);
  };

  const handleSend = () => {
    if (completed || loading) return;
    const value = input.trim();
    if (!value) return;
    setMessages(prev => [...prev, { sender: 'user', text: value }]);
    setInput('');
    sendToAssistant(value);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      <DefaultHeader />
      <div className="flex-1 overflow-auto p-4">
        {messages.map((m, i) => (
          <ChatMessage key={i} message={m.text} isUser={m.sender === 'user'} />
        ))}
        <div ref={endRef} />
      </div>
      {completed ? (
        <div className="flex p-4 border-t">
          <button
            onClick={() => router.push('/menu')}
            className="mx-auto px-4 py-2 bg-blue-600 text-white rounded"
          >
            К&nbsp;блюдам
          </button>
        </div>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
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
  );
}
