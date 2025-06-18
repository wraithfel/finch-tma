import { notFound } from 'next/navigation'
import DefaultHeader from '@/components/DefaultHeader'
import { menuData } from '../data'
import type { Menu } from '@/lib/types/menu'
import Image from 'next/image'
import DishActions from '@/components/DishActions'

/**
 * ⚠️ Если изображения не рендерятся:
 * 1. Проверьте, что файл реально лежит в папке `public`.
 * 2. Не начинайте путь с `/menu/...` — такой URL конфликтует с динамическим роутом.
 *    Например, храните картинки под `/images/menu/...`.
 */

const menu = menuData as Menu

export async function generateStaticParams() {
  return menu.categories.flatMap(c => c.items).map(i => ({ id: i.id }))
}

export default async function DishPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = menu.categories.flatMap(c => c.items).find(i => i.id === id)
  if (!item) return notFound()

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--tg-theme-bg-color)]">
      <DefaultHeader />

      <main className="flex-1 overflow-y-auto p-4 space-y-8">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-[color-mix(in_srgb,var(--tg-theme-hint-color)_50%,transparent)]">
          {/* Блюр-плейсхолдер, чтобы избежать скачка контента */}
          <Image
            src={item.image}
            alt={item.name}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Градиент сверху для читаемости оверлеев */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />
          {/* Чип с ценой */}
          <span className="absolute top-4 left-4 rounded-full px-3 py-1 text-sm font-semibold shadow backdrop-blur-md"
                style={{ backgroundColor: 'var(--tg-theme-button-color)', color: 'var(--tg-theme-button-text-color)' }}>
            {item.chip}
          </span>
          {/* Название на фоне изображения (мобильный wow-эффект) */}
          <h1 className="absolute bottom-4 left-4 right-4 text-2xl font-extrabold leading-tight text-white drop-shadow-lg">
            {item.name}
          </h1>
        </div>

        {/* Описание */}
        <p className="text-base leading-relaxed text-[var(--tg-theme-text-color)] opacity-90">
          {item.fullDescription}
        </p>

        {/* Ингредиенты */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--tg-theme-text-color)]">Ингредиенты</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm opacity-90">
            {item.ingredients.map((ing) => (
              <li key={ing} className="before:content-['•'] before:mr-1 before:text-[var(--tg-theme-button-color)]">
                {ing}
              </li>
            ))}
          </ul>
        </section>

        {/* Метод */}
        <section>
          <h2 className="mb-2 text-lg font-semibold text-[var(--tg-theme-text-color)]">Метод приготовления</h2>
          <p className="text-sm leading-relaxed opacity-90">{item.method}</p>
        </section>
      </main>

      {/* Кнопки действия */}
      <DishActions dishId={item.id} />
    </div>
  )
}