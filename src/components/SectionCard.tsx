'use client';

import React from 'react';
import Image from 'next/image';
import { Banner } from '@telegram-apps/telegram-ui';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface SectionCardProps {
  section: {
    key: string;
    header: string;
    subheader: string;
    backgroundImage: string;
    buttonText: string;
    onClickRoute: string;
  };
  index: number;
}

export default function SectionCard({ section, index }: SectionCardProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, marginTop: 30 }}
      animate={{ opacity: 1, marginTop: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="w-full"
    >
      <Banner
        type="section"
        header={section.header}
        subheader={section.subheader}
        className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[500px] overflow-hidden rounded-2xl shadow-xl"
        background={
          <div className="absolute inset-0">
            <Image
              src={section.backgroundImage}
              alt={section.header}
              fill
              priority
              loading="eager"
              decoding="sync"
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/10" />
          </div>
        }
      >
        <button
          onClick={() => router.push(section.onClickRoute)}
          className="
            backdrop-blur-lg font-semibold tracking-wide
            h-8 px-4 mt-12 shadow-md text-white border-2 border-white
            rounded-full outline-none active:opacity-75
          "
        >
          {section.buttonText}
        </button>
      </Banner>
    </motion.div>
  );
}
