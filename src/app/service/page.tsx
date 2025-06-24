"use client";

import React from "react";
import DefaultHeader from "@/components/DefaultHeader";
import ServiceTimeline from "@/components/ServiceTimeline";

export default function ServicePage() {
  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-[var(--tg-theme-bg-color)] to-[var(--tg-theme-secondary-bg-color)]">
      <DefaultHeader />

      <main className="flex-1 overflow-y-auto p-4 space-y-8">
        <section className="relative overflow-hidden rounded-3xl p-6 bg-[var(--tg-theme-secondary-bg-color)] shadow-lg animate-fade-in">

          <div className="absolute inset-0 pointer-events-none">
            <div className="w-64 h-64 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent)] blur-lg" />
          </div>

          <h1 className="text-3xl font-extrabold mb-4 tracking-tight">
            Добро пожаловать <span className="text-primary">в&nbsp;мир сервиса</span>
          </h1>

          <p className="text-base leading-relaxed">
            Перед&nbsp;тобой интерактивный&nbsp;гид, который <strong>шаг&nbsp;за&nbsp;шагом</strong> проведёт через
            все тонкости профессии&nbsp;официанта. Не зубри инструкции наизусть&nbsp;— преврати их
            в&nbsp;живое, тёплое общение. Ошибайся, делай выводы, пробуй снова: именно так
            рождаются <em>настоящие мастера гостеприимства</em>. А&nbsp;команда Finch всегда рядом,
            чтобы подсказать и поддержать!
          </p>
        </section>

        <ServiceTimeline />
      </main>
    </div>
  );
}
