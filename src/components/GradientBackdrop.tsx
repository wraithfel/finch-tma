"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface GradientBackdropProps {
  className?: string;
}

interface BlobConfig {
  color: string; 
  style: React.CSSProperties; 
  delay: number; 
}

const blobs: readonly BlobConfig[] = [
  {
    color: "bg-emerald-400",
    style: { top: "-15%", left: "-10%" },
    delay: 0,
  },
  {
    color: "bg-indigo-400",
    style: { bottom: "-10%", right: "-5%" },
    delay: 3,
  },
  {
    color: "bg-pink-400",
    style: { top: "25%", right: "-15%" },
    delay: 6,
  },
] as const;

function luminance(hex: string): number {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}


export default function GradientBackdrop({ className }: GradientBackdropProps) {
  const [blend, setBlend] = useState<"mix-blend-screen" | "mix-blend-overlay">(
    "mix-blend-screen",
  );
  
  useEffect(() => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(
      "--tg-theme-bg-color",
    );
    const hexMatch = raw.trim().match(/#([0-9a-f]{6})/i);
    if (hexMatch) {
      const lum = luminance(hexMatch[1]);
      if (lum > 0.75) setBlend("mix-blend-overlay");
    }
  }, []);

  return (
    <div
      className={clsx(
        "absolute inset-0 overflow-hidden select-none pointer-events-none",
        className,
      )}
      aria-hidden
    >
      {blobs.map((blob, i) => (
        <motion.div
          /* eslint-disable-next-line react/no-array-index-key */
          key={i}
          className={clsx(
            "absolute rounded-full blur-3xl opacity-70 w-72 h-72 sm:w-96 sm:h-96",
            blend,
            blob.color,
          )}
          style={blob.style}
          animate={{ scale: [1, 1.25, 1], x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: blob.delay,
          }}
        />
      ))}
    </div>
  );
}
