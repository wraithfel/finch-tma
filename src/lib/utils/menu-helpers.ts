import type { MenuItem, Sauce } from '@/lib/types/menu';
import { saucesData } from '@/lib/utils/constants';
import { menuData } from '@/app/menu/data';


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

export const validNames: Set<string> = new Set(
  (menuData as unknown as { name: string }[]).map(item => item.name.trim()),
);


export function stripCitations(text: string): string {
  return text.replace(/【\d+:\d+†source】/g, '').trim();
}


export function filterUnknownDishes(text: string): string {
  const found = [...text.matchAll(/«([^»]+)»/g)].map(m => m[1]);

  const unknown = found.filter(name => !validNames.has(name));
  if (unknown.length === 0) return text;

  let patched = text;
  unknown.forEach(name => {
    patched = patched.replaceAll(
      `«${name}»`,
      `«[позиция отсутствует в меню]»`,
    );
  });
  return patched;
}

