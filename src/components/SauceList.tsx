'use client';

import React, { useState } from 'react';
import type { Sauce } from '@/lib/types/menu';

export default function SauceList({ sauces }: { sauces: Sauce[] }) {
  if (sauces.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--tg-theme-text-color)]">
        Соусы
      </h2>

      <ul className="space-y-3">
        {sauces.map((sauce) => (
          <ExpandableSauce key={sauce.id} sauce={sauce} />
        ))}
      </ul>
    </section>
  );
}

function ExpandableSauce({ sauce }: { sauce: Sauce }) {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex justify-between items-center
                   px-4 py-2 rounded-xl shadow
                   bg-[var(--tg-theme-secondary-bg-color)]
                   text-[var(--tg-theme-text-color)] font-medium"
      >
        <span>{sauce.name}</span>
        <span>{open ? '–' : '+'}</span>
      </button>

      {open && (
        <ul className="mt-2 ml-4 list-disc space-y-1 text-sm opacity-80">
          {sauce.ingredients.map((ing) => (
            <li key={ing}>{ing}</li>
          ))}
        </ul>
      )}
    </li>
  );
}
