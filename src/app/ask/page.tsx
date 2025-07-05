'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DefaultHeader from '@/components/DefaultHeader';
import ChatMessage from '@/components/ChatMessage';
import { useChat } from '@/lib/stores/chatStore';
import { menuData } from '@/app/menu/data';
import { drinksData } from '@/app/drinks/data';

export default function AskPage() {
  const params = useSearchParams();
  const initialId = params.get('dish') ?? params.get('drink') ?? undefined;

  const { messages, add, reset } = useChat();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reset(initialId);
  }, [initialId, reset]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user' as const, content: input.trim() };
    add(userMsg);
    setInput('');
    setLoading(true);

    const dish =
      initialId &&
      (
        menuData.categories.flatMap(c => c.items).find(i => i.id === initialId) ??
        drinksData.categories.flatMap(c => c.items).find(i => i.id === initialId)
      );

    const prompt = [
      {
        role: 'system' as const,
        content: `Ты — приветливый наставник официанта в Finch. Отвечай кратко и дружелюбно.${dish ? ` Стажер спрашивает про блюдо «${dish.name}».` : ''}`,
      },
      ...(dish
        ? [
            {
              role: 'system' as const,
              content: `Полные данные о блюде (JSON):\n${JSON.stringify(dish, null, 2)}`,
            },
          ]
        : []),
      ...messages,
      userMsg,
    ];

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: prompt }),
      });

      if (!res.ok) {
        const text = await res.text();
        add({ role: 'assistant', content: `Ошибка: ${res.status} – ${text}` });
        return;
      }

      const { content } = (await res.json()) as { content: string };
      add({ role: 'assistant', content });
    } catch {
      add({ role: 'assistant', content: 'Не удалось связаться с сервером.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--tg-theme-bg-color)]">
      <DefaultHeader />

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <ChatMessage key={i} {...m} />
        ))}
        {loading && <ChatMessage role="assistant" content="⌛️ ..." />}
        <div ref={bottomRef} />
      </main>

      <form
        onSubmit={e => {
          e.preventDefault();
          send();
        }}
        className="sticky bottom-0 p-3 flex gap-2 backdrop-blur-md bg-[var(--tg-theme-bg-color)]/80"
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Спросите что-нибудь…"
          className="flex-1 rounded-full px-4 py-3 text-sm bg-[var(--tg-theme-secondary-bg-color)] outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-6 py-3 rounded-full font-bold bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] disabled:opacity-50"
        >
          ➤
        </button>
      </form>
    </div>
  );
}
