/**
 * Генерирует из menuData и drinksData два .md-файла для Assistants API.
 */
import fs from 'fs/promises';
import path from 'path';
import { menuData } from '@/app/menu/data'; 
import { drinksData } from '@/app/drinks/data';
import { saucesData } from '../utils/constants'; 


async function main() {
  const out = path.resolve(process.cwd(), 'knowledge');
  await fs.mkdir(out, { recursive: true });

  await fs.writeFile(
    path.join(out, 'finch_menu.md'),
    '# Меню Finch\n\n```json\n' +
      JSON.stringify(menuData, null, 2) +
    '\n```'
  );

  await fs.writeFile(
    path.join(out, 'finch_drinks.md'),
    '# Напитки Finch\n\n```json\n' +
      JSON.stringify(drinksData, null, 2) +
    '\n```'
  );

  await fs.writeFile(
    path.join(out, 'finch_sauces.md'),
    '# Соусы Finch\n\n```json\n' +
      JSON.stringify(saucesData, null, 2) +
    '\n```'
  );

  console.log('✅ Сгенерированы finch_menu.md и finch_drinks.md в папке knowledge/');
  console.log('👉 Для стандарта сервиса вручную создайте knowledge/finch_service.md');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
