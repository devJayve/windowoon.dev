'use client';

import { HeartIcon } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { AnimatePresence, motion } from 'framer-motion';

function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
  };
  return (
    <button onClick={handleLike} className="flex items-center gap-1">
      <HeartIcon
        className={cn(
          `transition-colors duration-200 ${isLiked ? 'fill-red-500 text-red-500' : 'text-neutral-300'}`,
        )}
        size="18"
      />
      <AnimatePresence mode="wait">
        {likeCount > 0 && <AnimatedNumber value={likeCount} />}
      </AnimatePresence>
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
