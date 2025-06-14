import '@telegram-apps/telegram-ui/dist/styles.css';
import { Banner, Button } from '@telegram-apps/telegram-ui';
import React from 'react';
import Image from 'next/image';
import { useTelegramUser } from '@/lib/hooks/useTelegramUser';
import Header from '@/components/header';

const sections = [
  {
    key: 'menu',
    header: 'Изучить меню',
    subheader: 'Карточки блюд с возможностью задать вопрос AI-помощнику',
    backgroundImage: '/finch-dish.jpg',
    buttonText: 'Перейти к меню',
    onClickRoute: '/menu'
  },
  {
    key: 'drinks',
    header: 'Изучить напитки',
    subheader: 'Карточки напитков с возможностью задать вопрос AI-помощнику',
    backgroundImage: '/finch-drinks.jpg',
    buttonText: 'Перейти к напиткам',
    onClickRoute: '/drinks'
  },
  {
    key: 'service',
    header: 'Информация по сервису',
    subheader: 'Основные стандарты обслуживания и рекомендации',
    backgroundImage: '/finch-service.jpg',
    buttonText: 'Подробнее',
    onClickRoute: '/service'
  },
  {
    key: 'tests',
    header: 'Пройти тесты',
    subheader: 'Проверь свои знания: отвечай на вопросы, AI проверяет правильность',
    backgroundImage: '/finch-tests.jpg',
    buttonText: 'Начать тест',
    onClickRoute: '/tests'
  },
  {
    key: 'ask',
    header: 'Общий вопрос',
    subheader: 'Задай AI-помощнику любой вопрос о работе',
    backgroundImage: '/finch-ask.jpg',
    buttonText: 'Задать вопрос',
    onClickRoute: '/ask'
  },
  {
    key: 'profile',
    header: 'Профиль',
    subheader: 'Твоя статистика и карточка сотрудника',
    backgroundImage: '/finch-profile.jpg',
    buttonText: 'Открыть профиль',
    onClickRoute: '/profile'
  }
];

export default function HomePage() {
  const { userData, theme } = useTelegramUser();

  if (!userData || !theme) {
    return <div className="p-4 font-bold text-3xl text-cyan-300">Loading…</div>;
  }

  return (
    <>
      <Header
        logoUrl="/logo-finch.svg"
        avatarUrl={userData.photo_url || ''}
        firstName={userData.first_name}
        theme={theme}
      />

      <main className="p-2 space-y-4">
        {sections.map(section => (
          <Banner
            key={section.key}
            type="section"
            header={section.header}
            subheader={section.subheader}
            background={
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <Image
                  src={section.backgroundImage}
                  alt={section.header}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
            }
          >
            <Button
              mode="outline"
              size="s"
              style={{ color: 'white', border: '2px solid white' }}
              className="shadow-md"
              onClick={() => {
                window.location.href = section.onClickRoute;
              }}
            >
              {section.buttonText}
            </Button>
          </Banner>
        ))}
      </main>
    </>
  );
}
