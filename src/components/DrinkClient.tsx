'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DefaultHeader from '@/components/DefaultHeader'
import NutritionCycle from '@/components/NutritionCycle'
import { useCart } from '@/lib/stores/cartStore'
import type { MenuItem } from '@/lib/types/menu'

export default function DrinkClient({ item }: { item: MenuItem }) {
  const { add, increase, decrease, items } = useCart()
  const cartItem = items.find(ci => ci.item.id === item.id && ci.variantId === undefined)
  const qty = cartItem?.quantity ?? 0

  const [variantId, setVariantId] = useState<string | undefined>(item.variants?.[0]?.id)

  const handleAdd = () => {
    if (qty === 0) add(item, variantId)
    else increase(item.id, variantId)
  }
  const dec = () => decrease(item.id, variantId)

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--tg-theme-bg-color)]">
      <DefaultHeader />

      <main className="flex-1 overflow-y-auto p-4 space-y-8">
        <div className="relative w-full aspect-[4/3] sm:aspect-auto sm:h-[420px] overflow-hidden rounded-3xl shadow-xl ring-1 ring-[color-mix(in_srgb,var(--tg-theme-hint-color)_50%,transparent)] group">
          <Image
            src={item.image}
            alt={item.name}
            fill
            priority
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-transparent" />
          <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/30 px-3 py-1 text-sm font-semibold text-white shadow backdrop-blur-sm ring-1 ring-white/40">
            {item.chip}
          </span>
          <h1 className="absolute bottom-6 left-6 right-6 text-2xl sm:text-4xl font-extrabold leading-tight text-white drop-shadow-lg">
            {item.name}
          </h1>
        </div>

        <p className="text-base leading-relaxed opacity-90">{item.fullDescription}</p>

        {item.variants && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Выберите вариант</h2>
            <div className="flex flex-wrap gap-2">
              {item.variants.map(v => (
                <button
                  key={v.id}
                  onClick={() => setVariantId(v.id)}
                  className={`px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm transition-all duration-300 ring-1 ring-[var(--tg-theme-hint-color)] ${
                    variantId === v.id
                      ? 'bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] shadow'
                      : 'text-[var(--tg-theme-text-color)]/80 hover:bg-[color-mix(in_srgb,var(--tg-theme-hint-color)_12%,transparent)]'
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </section>
        )}

        {item.ingredients.length > 0 && (
          <section>
            <h2 className="mb-3 text-lg font-semibold">Состав</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm opacity-90">
              {item.ingredients.map(ing => (
                <li
                  key={ing}
                  className="before:content-['•'] before:mr-1 before:text-[var(--tg-theme-button-color)]"
                >
                  {ing}
                </li>
              ))}
            </ul>
          </section>
        )}

        {item.nutrition && <NutritionCycle nutrition={item.nutrition} />}

        {item.method && (
          <section>
            <h2 className="mb-2 text-lg font-semibold">Метод приготовления</h2>
            <p className="text-sm leading-relaxed opacity-90">{item.method}</p>
          </section>
        )}
      </main>

      <div className="sticky bottom-0 flex gap-3 p-4 bg-[var(--tg-theme-bg-color)]/80 backdrop-blur-md">
        <Link
          href={`/ask?drink=${item.id}`}
          className="flex-1 text-center py-3 rounded-full font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg active:scale-95 transition"
        >
          Спросить&nbsp;AI
        </Link>

        {qty === 0 ? (
          <button
            onClick={handleAdd}
            disabled={!!item.variants && !variantId}
            className="flex-1 py-3 rounded-full font-bold bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 text-white shadow-lg active:scale-95 transition disabled:opacity-50"
          >
            Добавить в заказ
          </button>
        ) : (
          <div className="flex-1 flex items-center justify-between rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 text-white shadow-lg">
            <button
              onClick={dec}
              className="flex-1 h-full flex items-center justify-center py-3 hover:bg-emerald-700/30 active:scale-95 transition"
            >
              –
            </button>
            <span className="w-10 text-center font-bold select-none">{qty}</span>
            <button
              onClick={handleAdd}
              className="flex-1 h-full flex items-center justify-center py-3 hover:bg-emerald-700/30 active:scale-95 transition"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
