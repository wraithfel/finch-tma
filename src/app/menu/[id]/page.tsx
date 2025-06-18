import { notFound } from 'next/navigation';
import DefaultHeader from '@/components/DefaultHeader';
import { menuData } from '../data';
import type { Menu } from '@/lib/types/menu';
import Image from 'next/image';
import Link from 'next/link';

const menu = menuData as Menu;

export async function generateStaticParams() {
  return menu.categories
    .flatMap((c) => c.items)
    .map((item) => ({ id: item.id }));
}

export default function DishPage({ params }: { params: { id: string } }) {
  const item =
    menu.categories.flatMap((c) => c.items).find((i) => i.id === params.id);

  if (!item) return notFound();

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--tg-theme-bg-color)]">
      <DefaultHeader />

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="w-full relative rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={item.image}
            alt={item.name}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-[var(--tg-theme-text-color)]">
            {item.name}
          </h1>
          <span className="text-xl font-semibold text-[var(--tg-theme-button-color)]">
            {item.chip}
          </span>
        </div>

        <p className="text-[var(--tg-theme-text-color)] opacity-90">
          {item.fullDescription}
        </p>

        <section>
          <h2 className="text-lg font-semibold mb-2">Ингредиенты:</h2>
          <ul className="list-disc pl-5 space-y-1">
            {item.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Метод приготовления:</h2>
          <p>{item.method}</p>
        </section>
      </main>

      <div className="sticky bottom-0 flex gap-3 p-4 bg-[var(--tg-theme-bg-color)]/80 backdrop-blur-md">
        <Link
          href={`/ask?dish=${item.id}`}        
          className="flex-1 text-center py-3 rounded-full font-bold
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            text-white shadow-lg active:scale-95 transition"
        >
          Спросить AI
        </Link>

        <button
          onClick={() => {/* TODO: dispatch add-to-cart */}}
          className="flex-1 py-3 rounded-full font-bold
            bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600
            text-white shadow-lg active:scale-95 transition"
        >
          Добавить в заказ
        </button>
      </div>
    </div>
  );
}
