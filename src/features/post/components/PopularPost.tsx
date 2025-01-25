'use client';

import Image from 'next/image';
import { useState } from 'react';

import { PopularPostProps } from '@/shared/types/post';

export default function PopularPost({ category, title, imageUrl }: PopularPostProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative size-40 shrink-0 overflow-hidden rounded-xl bg-gray-100 p-3 shadow-md dark:bg-neutral-800/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered ? (
        <div>
          <div className="text-xs font-semibold text-amber-400">{category}</div>
          <div className="text-lg font-medium">{title}</div>
          <Image
            src={imageUrl}
            alt={title}
            width={80}
            height={80}
            className="light:invert absolute bottom-5 right-5"
          />
        </div>
      ) : (
        <div>
          <div>content</div>
          <Image
            src={imageUrl}
            alt={title}
            width={80}
            height={80}
            className="light:invert absolute bottom-5 right-5 opacity-50"
          />
        </div>
      )}
    </div>
  );
}
