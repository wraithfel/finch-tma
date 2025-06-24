import { notFound } from 'next/navigation';
import Image from 'next/image';
import DefaultHeader from '@/components/DefaultHeader';
import DishActions from '@/components/DishActions';
import NutritionCycle from '@/components/NutritionCycle';
import SauceList from '@/components/SauceList';

import { menuData } from '../data';
import type { Menu } from '@/lib/types/menu';
import { getSauces, mergeAllergens } from '@/lib/utils/menu-helpers';

const menu = menuData as Menu;

export async function generateStaticParams() {
  return menu.categories.flatMap((c) => c.items).map((i) => ({ id: i.id }));
}

interface DishPageProps {
  params: Promise<{ id: string }>;
}

export default async function DishPage({ params }: DishPageProps) {
  const { id } = await params;
  const item = menu.categories.flatMap((c) => c.items).find((i) => i.id === id);
  if (!item) return notFound();

  const sauces = getSauces(item);
  const allergens = mergeAllergens(item);

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

        <p className="text-base leading-relaxed text-[var(--tg-theme-text-color)] opacity-90">
          {item.fullDescription}
        </p>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--tg-theme-text-color)]">
            Ингредиенты
          </h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm opacity-90">
            {item.ingredients.map((ing) => (
              <li
                key={ing}
                className="before:content-['•'] before:mr-1 before:text-[var(--tg-theme-button-color)]"
              >
                {ing}
              </li>
            ))}
          </ul>
        </section>

        <SauceList sauces={sauces} />

        {allergens.length > 0 && (
          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--tg-theme-text-color)]">
              Аллергены
            </h2>
            <ul className="flex flex-wrap gap-2 text-sm opacity-90">
              {allergens.map((allergen) => (
                <li
                  key={allergen}
                  className="px-2 py-1 rounded-full bg-red-50 text-red-700 ring-1 ring-red-200"
                >
                  {allergen}
                </li>
              ))}
            </ul>
          </section>
        )}

        {item.nutrition && <NutritionCycle nutrition={item.nutrition} />}

        <section>
          <h2 className="mb-2 text-lg font-semibold text-[var(--tg-theme-text-color)]">
            Метод приготовления
          </h2>
          <p className="text-sm leading-relaxed opacity-90">{item.method}</p>
        </section>
      </main>

      <DishActions dishId={item.id} />
    </div>
  );
}
