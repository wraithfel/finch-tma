import { notFound } from 'next/navigation';
import type { MenuItem } from '@/lib/types/menu';
import { drinksData } from '../data';
import DrinkClient from './DrinkClient'; 

const allDrinks: MenuItem[] = drinksData.categories.flatMap(c => c.items);

export async function generateStaticParams() {
  return allDrinks.map(d => ({ id: d.id }));
}

export default function DrinkPage({ params }: { params: { id: string } }) {
  const item = allDrinks.find(d => d.id === params.id);
  if (!item) return notFound();
  return <DrinkClient item={item} />;
}
