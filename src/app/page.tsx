'use client';

import '@telegram-apps/telegram-ui/dist/styles.css';
import { Banner, Button } from '@telegram-apps/telegram-ui';
import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';
import { useTelegramUser } from '@/lib/hooks/useTelegramUser';
import Header from '@/components/header';
import { useRouter } from 'next/navigation';

const sections = [
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
] as const;

export default function HomePage() {
  const { userData, theme } = useTelegramUser();
  const router = useRouter();

  if (!userData || !theme) {
    return (
      <div className="flex h-dvh items-center justify-center text-3xl font-bold text-cyan-300">
        Loading…
      </div>
    );
  }

  return (
    <>
      <Header
        logoUrl="/logo-finch.svg"
        avatarUrl={userData.photo_url || ''}
        firstName={userData.first_name}
        theme={theme}
      />

      <main className="flex flex-col gap-5 p-4 pb-8">
        {sections.map((section, idx) => (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.35 }}
          >
            <Banner
              type="section"
              header={section.header}
              subheader={section.subheader}
              className="overflow-hidden rounded-2xl shadow-xl"
              background={
                <div className="absolute inset-0">
                  <Image
                    src={section.backgroundImage}
                    alt={section.header}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/10" />
                </div>
              }
            >
              <Button
                mode="outline"
                size="s"
                className="backdrop-blur-lg font-semibold uppercase tracking-wide !h-8 !px-4 shadow-md"
                style={{ borderWidth: '2px', borderColor: 'currentColor' }}
                onClick={() => router.push(section.onClickRoute)}
              >
                {section.buttonText}
              </Button>
            </Banner>
          </motion.div>
        ))}
      </main>
    </>
  );
}
