'use client';
import { create } from 'zustand';

export type ChatMsg = { role: 'user' | 'assistant'; content: string };

interface ChatState {
  dishName?: string;
  messages: ChatMsg[];
  add: (m: ChatMsg) => void;
  reset: (dishName?: string) => void;
}

export const useChat = create<ChatState>((set) => ({
  dishName: undefined,
  messages: [],
  add: (m) => set((s) => ({ messages: [...s.messages, m] })),
  reset: (dishName) => set({ messages: [], dishName }),
}));
