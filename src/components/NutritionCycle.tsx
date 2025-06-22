'use client';

import React from 'react';

type Nutrition = {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
};

const LABELS: Record<keyof Nutrition, string> = {
  calories: 'Калории',
  protein: 'Белки',
  fat: 'Жиры',
  carbs: 'Углеводы',
};

const MAX: Record<keyof Nutrition, number> = {
  calories: 1000,
  protein: 50,
  fat: 50,
  carbs: 100,
};

export default function NutritionBars({ nutrition }: { nutrition: Nutrition }) {
  const keys = Object.keys(nutrition) as (keyof Nutrition)[];
  return (
    <section className="rounded-2xl p-4 shadow-inner bg-[var(--tg-theme-secondary-bg-color)] space-y-4">
      {keys.map((key) => {
        const val = nutrition[key];
        const percent = Math.min(100, (val / MAX[key]) * 100);
        return (
          <div key={key} className="space-y-1">
            <div className="flex justify-between items-end">
              <span className="text-sm font-medium text-[var(--tg-theme-text-color)]">
                {LABELS[key]}
              </span>
              <span className="text-sm font-semibold tabular-nums text-[var(--tg-theme-text-color)]">
                {val}
                {key === 'calories' ? ' ккал' : ' г'}
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-[color-mix(in_srgb,var(--tg-theme-hint-color)_25%,transparent)] overflow-hidden">
              <div
                style={{ width: `${percent}%` }}
                className="h-full rounded-full bg-[var(--tg-theme-button-color)] transition-all duration-700"
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
