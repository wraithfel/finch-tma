import type { MenuItem, Sauce } from '@/lib/types/menu';
import { saucesData } from '@/lib/utils/constants';


export const sauceMap: Record<string, Sauce> = Object.fromEntries(
  saucesData.map((s) => [s.id, s]),
);


export function getSauces(item: MenuItem): Sauce[] {
  return (item.sauceIds ?? []).map((id) => sauceMap[id]).filter(Boolean);
}


export function mergeAllergens(item: MenuItem): string[] {
  const own = item.allergens ?? [];
  const sauces = getSauces(item).flatMap((s) => s.allergens ?? []);
  return Array.from(new Set([...own, ...sauces]));
}

