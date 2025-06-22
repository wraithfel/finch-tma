import { Sauce } from "../types/menu";

export const sections = [
  {
    key: 'menu',
    header: 'Изучить меню',
    subheader: 'Карточки блюд + AI-помощник',
    backgroundImage: '/finch-dish.jpg',
    buttonText: 'К меню',
    onClickRoute: '/menu',
  },
  {
    key: 'drinks',
    header: 'Изучить напитки',
    subheader: 'Карточки напитков + AI-помощник',
    backgroundImage: '/finch-drinks.jpg',
    buttonText: 'К напиткам',
    onClickRoute: '/drinks',
  },
  {
    key: 'service',
    header: 'Информация по сервису',
    subheader: 'Стандарты обслуживания и рекомендации',
    backgroundImage: '/finch-service.jpg',
    buttonText: 'Подробнее',
    onClickRoute: '/service',
  },
  {
    key: 'tests',
    header: 'Пройти тесты',
    subheader: 'Проверь знания, AI проверит ответы',
    backgroundImage: '/finch-tests.jpg',
    buttonText: 'Начать тест',
    onClickRoute: '/tests',
  },
  {
    key: 'ask',
    header: 'Общий вопрос',
    subheader: 'Задай любой вопрос о работе',
    backgroundImage: '/finch-ask.jpg',
    buttonText: 'Спросить',
    onClickRoute: '/ask',
  },
  {
    key: 'profile',
    header: 'Профиль',
    subheader: 'Карточка сотрудника и статистика',
    backgroundImage: '/finch-profile.jpg',
    buttonText: 'Открыть',
    onClickRoute: '/profile',
  },
];



export const saucesData: Sauce[] = [
  {
    id: 'hollandaise',
    name: 'Голландский',
    ingredients: [
      'Желток',
      'Масло сливочное',
      'Вода',
      'Соль',
      'Лимонный фреш'
    ],
    allergens: ['яйцо', 'молоко']
  },
  {
    id: 'anglaise',
    name: 'Английский',
    ingredients: [
      'Яйцо куриное',
      'Молоко',
      'Сливки',
      'Сахар ванильный',
      'Сахар'
    ],
    allergens: ['яйцо', 'молоко']
  },
  {
    id: 'chocolate_sauce',
    name: 'Шоколадный соус',
    ingredients: [
      'Шоколад горький',
      'Соус Английский'
    ],
    allergens: ['молоко', 'яйцо']
  },
  {
    id: 'blue_cheese',
    name: 'Блю-чиз',
    ingredients: [
      'Сыр с плесенью',
      'Молоко',
      'Масло сливочное',
      'Мука пшеничная'
    ],
    allergens: ['молоко', 'глютен']
  },
  {
    id: 'pesto',
    name: 'Песто',
    ingredients: [
      'Масло растительное',
      'Шпинат',
      'Брокколи',
      'Соль',
      'Чеснок',
      'Лимонный фреш',
      'Перец чёрный',
      'Пармезан',
      'Грецкий орех'
    ],
    allergens: ['орехи', 'молоко']
  },
  {
    id: 'green_oil',
    name: 'Масло зелёное',
    ingredients: ['Масло растительное', 'Петрушка']
  },
  {
    id: 'demiglace',
    name: 'Демиглас',
    ingredients: [
      'Говяжьи кости',
      'Лук шалот',
      'Лук сибулет',
      'Лук репчатый',
      'Морковь',
      'Петрушка',
      'Лавровый лист',
      'Перец чёрный',
      'Перец душистый',
      'Красное вино',
      'Чеснок'
    ],
  },
  {
    id: 'onion_sauce',
    name: 'Луковый соус',
    ingredients: [
      'Соевый соус',
      'Уксус',
      'Сахар',
      'Соль',
      'Растительное масло',
      'Экстракт пшеницы',
      'Лук'
    ],
    allergens: ['соя', 'глютен']
  },
  {
    id: 'wasabi_dressing',
    name: 'Васаби-дрессинг',
    ingredients: [
      'Соевый соус (вода, соя, соль)',
      'Уксус',
      'Сахар',
      'Соль',
      'Масло подсолнечное',
      'Экстракт пшеницы',
      'Ферментированный рис',
      'Сушёные нори',
      'Васаби'
    ],
    allergens: ['соя', 'глютен']
  },
  {
    id: 'sesame_yuzu',
    name: 'Кунжут юдзу',
    ingredients: [
      'Кунжут жареный',
      'Сахар',
      'Соль',
      'Экстракт юдзу'
    ],
    allergens: ['кунжут']
  },
  {
    id: 'sesame_kimchi',
    name: 'Кунжут кимчи',
    ingredients: [
      'Кунжут жареный',
      'Соль',
      'Сахар',
      'Чеснок',
      'Перец красный',
      'Экстракт скумбрии',
      'Пигмент паприки',
      'Экстракт пшеницы'
    ],
    allergens: ['кунжут', 'рыба', 'глютен']
  },
  {
    id: 'furikake',
    name: 'Фурикаке',
    ingredients: [
      'Кунжут',
      'Соль',
      'Сахар',
      'Морская капуста',
      'Стружка тунца',
      'Васаби',
      'Зелёные водоросли',
      'Соевая мука',
      'Зелёный чай',
      'Фасоль жареная'
    ],
    allergens: ['рыба', 'соя', 'кунжут']
  }
]