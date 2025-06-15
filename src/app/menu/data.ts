'use client';

export const menuData = {
  categories: [
    {
      key: 'eggs',
      name: 'Яйца',
      items: [
        {
          id: 'glazunya',
          name: 'Глазунья',
          description: 'Жареные яйца с нежным жидким желтком',
          ingredients: [
            'Яйцо куриное',
            'Хлеб гречишный',
            'Масло растительное',
            'Микрозелень'
          ],
          method: '2 яйца жарятся на растительном масле, желток остаётся жидким.',
          image: '/menu/egg/glaz.jpg',
          chip: '220 ₽'
        },
        {
          id: 'scramble',
          name: 'Скрэмбл',
          description: 'Пушистая яичная масса со сливками',
          ingredients: [
            'Яйцо куриное',
            'Сливки',
            'Соль',
            'Масло растительное',
            'Масло сливочное',
            'Хлеб гречишный',
            'Микрозелень',
            'Хлеб цельнозерновой'
          ],
          method: 'Яйца смешиваются со сливками и готовятся на сливочном масле.',
          image: '/menu/egg/scrambl.jpg',
          chip: '220 ₽'
        },
        {
          id: 'omlet',
          name: 'Омлет',
          description: 'Пушистый омлет на молоке',
          ingredients: [
            'Яйцо куриное',
            'Молоко',
            'Хлеб гречишный',
            'Масло растительное',
            'Микрозелень'
          ],
          method: 'Яйца взбиваются с молоком и обжариваются до пышности.',
          image: '/menu/egg/omlet.jpg',
          chip: '220 ₽'
        },
        {
          id: 'poached',
          name: 'Пашот',
          description: 'Яйцо пашот с нежным белком и жидким желтком',
          ingredients: [
            'Яйцо куриное',
            'Хлеб гречишный',
            'Микрозелень'
          ],
          method: 'Яйцо варится в кипящей солёной воде без скорлупы.',
          image: '/menu/egg/pashot.jpg',
          chip: '220 ₽'
        },
        {
          id: 'boltunya',
          name: 'Болтунья',
          description: 'Классическая яичница-болтунья',
          ingredients: [
            'Яйцо куриное',
            'Хлеб гречишный',
            'Масло растительное',
            'Микрозелень'
          ],
          method: 'Яйца быстро перемешиваются на сковороде до образования нежной массы.',
          image: '/menu/egg/bolt.jpg',
          chip: '220 ₽'
        }
      ],
      extras: [
        { id: 'avocado', name: 'Авокадо' },
        { id: 'shrimp', name: 'Креветки' },
        { id: 'salmon', name: 'Лосось' },
        { id: 'bacon', name: 'Бекон' },
        { id: 'spinach', name: 'Шпинат' },
        { id: 'tomatoes', name: 'Томаты' },
        { id: 'mushrooms', name: 'Шампиньоны' },
        { id: 'stracciatella', name: 'Страчателла' },
        { id: 'parmesan', name: 'Пармезан' },
        { id: 'cream_cheese', name: 'Крем-чиз' },
        {
          id: 'flank_steak',
          name: 'Фланк-стейк (100 г)',
          description: 'Нежирная вырезка говядины, маринуется с перцем'
        },
        { id: 'chicken_breast', name: 'Куриная грудка' }
      ]
    }
  ]
};
