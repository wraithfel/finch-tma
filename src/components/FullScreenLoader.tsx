'use client';

import React from 'react';
import Image from 'next/image';

export default function FullScreenLoader() {
  return (
    <div className="flex h-dvh items-center justify-center bg-black">
      <Image
        src="/my-loader.svg"
        alt="Loading..."
        width={80}
        height={80}
        priority
        className="animate-spin"
      />
    </div>
  );
}
