'use client';

import { HeartIcon } from 'lucide-react';
import React from 'react';
import { cn } from '@/shared/lib/cn';
import { AnimatePresence, motion } from 'framer-motion';

interface LikeButtonProps {
  disabled: boolean;
  isLiked: boolean;
  count: number;
  onClick?: () => void;
  className?: string;
}

function LikeButton({ disabled, isLiked, count, onClick, className }: LikeButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn('flex items-center gap-1', className)}
    >
      <HeartIcon
        className={cn(
          `transition-colors duration-200 ${isLiked ? 'fill-red-500 text-red-500' : 'text-neutral-400 dark:text-neutral-300'}`,
        )}
        size="18"
      />
      <AnimatePresence mode="wait">{count > 0 && <AnimatedNumber value={count} />}</AnimatePresence>
    </button>
  );
}

const AnimatedNumber = ({ value }: { value: number }) => {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="font-semibold"
    >
      {value}
    </motion.span>
  );
};

export default LikeButton;
