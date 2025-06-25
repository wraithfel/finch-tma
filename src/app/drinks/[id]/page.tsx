import { notFound } from 'next/navigation';
import type { MenuItem } from '@/lib/types/menu';
import { drinksData } from '../data';
import DrinkClient from './DrinkClient';

const allDrinks: MenuItem[] = drinksData.categories.flatMap(c => c.items);

export async function generateStaticParams() {
  return allDrinks.map(d => ({ id: d.id }));
}


export default async function DrinkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const drink = allDrinks.find(d => d.id === id);
  if (!drink) notFound();

  return <DrinkClient item={drink} />;
}
