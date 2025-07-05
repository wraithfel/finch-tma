'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/stores/cartStore';
import { useStats } from '@/lib/stores/statsStore';
import { useTelegramUser } from '@/lib/hooks/useTelegramUser';
import DefaultHeader from '@/components/DefaultHeader';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { items, remove, clear } = useCart();
  const { userData } = useTelegramUser();
  const incOrders = useStats(s => s.incOrders);

  if (items.length === 0) {
    return (
      <div className="min-h-dvh flex flex-col bg-[var(--tg-theme-bg-color)]">
        <DefaultHeader />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 p-4 text-center">
          <p className="text-lg font-medium opacity-80">Заказ пуст</p>
          <button
            onClick={() => router.replace('/')}
            className="inline-block rounded-full bg-[var(--tg-theme-button-color)] px-6 py-3 font-semibold text-[var(--tg-theme-button-text-color)] shadow-md hover:brightness-110 transition"
          >
            Вернуться на главную
          </button>
        </main>
      </div>
    );
  }

  const total = items.reduce(
    (sum, i) => sum + Number(i.item.chip.replace(/\D/g, '')) * i.quantity,
    0
  );

  const acceptOrder = () => {
    if (!userData) return;
    incOrders(userData.id);
    clear();
  };

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--tg-theme-bg-color)]">
      <DefaultHeader />
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <h1 className="text-2xl font-extrabold text-[var(--tg-theme-text-color)]">
          Заказ
        </h1>
        <ul className="space-y-4">
          {items.map(({ item, quantity }) => (
            <li
              key={item.id}
              className="flex items-center gap-4 rounded-2xl shadow-lg p-3 bg-[var(--tg-theme-secondary-bg-color)]"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 space-y-1">
                <h2 className="text-lg font-semibold leading-tight text-[var(--tg-theme-text-color)]">
                  {item.name}
                </h2>
                <p className="text-sm opacity-70">
                  {quantity} × {item.chip}
                </p>
              </div>
              <button
                onClick={() => remove(item.id)}
                aria-label="Убрать из корзины"
                className="p-2 rounded-full hover:bg-red-50 active:scale-95 transition"
              >
                <Trash2 size={20} className="text-red-600" />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center pt-4 border-t border-[var(--tg-theme-hint-color)]">
          <span className="text-lg font-bold text-[var(--tg-theme-text-color)]">Итого</span>
          <span className="text-xl font-extrabold">
            {total.toLocaleString('ru-RU')} ₽
          </span>
        </div>
        <button
          onClick={acceptOrder}
          disabled={!userData}
          className="w-full py-3 rounded-full font-bold bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-lg active:scale-95 transition disabled:opacity-50"
        >
          Принять заказ
        </button>
        <button
          onClick={clear}
          className="w-full py-3 rounded-full font-bold bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white shadow-lg active:scale-95 transition"
        >
          Очистить заказ
        </button>
      </main>
    </div>
  );
}
