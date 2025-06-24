'use client';
import React from 'react';
import clsx from 'clsx';

export default function ChatMessage({ role, content }: { role: 'user'|'assistant'; content: string }) {
  const isUser = role === 'user';
  return (
    <div className={clsx('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={clsx(
          'max-w-[75%] rounded-2xl px-4 py-2 whitespace-pre-wrap leading-relaxed',
          isUser
            ? 'bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]'
            : 'bg-[var(--tg-theme-secondary-bg-color)] text-[var(--tg-theme-text-color)]'
        )}
      >
        {content}
      </div>
    </div>
  );
}
