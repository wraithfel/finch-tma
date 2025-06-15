'use client';

import React from 'react';

export default function FullScreenLoader() {
  return (
    <div className="flex h-dvh items-center justify-center bg-black">
      <img src="/my-loader.svg" alt="Loading..." />
    </div>
  );
}
