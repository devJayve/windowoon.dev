'use client';
import Link from 'next/link';
import { PostMeta } from '@/features/post/types';
import { motion } from 'framer-motion';
import { formatDate } from '@/shared/lib/date';
import { clsx } from 'clsx';
import { Calendar } from 'lucide-react';

interface RegPostProps {
  post: PostMeta;
}

export default function PostItem({ post }: RegPostProps) {
  const overlayVariants = {
    hidden: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
    },
    visible: {
      opacity: 1,
      backdropFilter: 'blur(4px)',
      transition: {
        duration: 0.2,
      },
    },
  };

  const descriptionVariants = {
    hidden: {
      y: 10,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.1,
      },
    },
  };

  return (
    <Link href={`/post/${post.id}/${post.slug}`}>
      <motion.div className="group relative flex p-4" initial="hidden" whileHover="visible">
        <div className="w-full space-y-1 p-1">
          <div className="text-lg font-semibold">{post.title}</div>
          <div className="flex items-end justify-between">
            <div className="flex flex-wrap items-center gap-1 overflow-hidden">
              {post.categories.map(category => (
                <span
                  key={category}
                  className="inline-flex items-center rounded-md bg-gray-200 px-2.5 text-xs font-medium dark:bg-gray-100/20"
                >
                  {category}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-0.5 pl-4">
              <Calendar size={12} />
              <p className="truncate text-xs font-light">{formatDate(post.createdAt)}</p>
            </div>
          </div>
        </div>
        <motion.div
          variants={overlayVariants}
          className={clsx('absolute inset-0', 'bg-background/30')}
        />
        <motion.div
          variants={descriptionVariants}
          className="absolute inset-0 flex items-center p-4"
        >
          <p className="text-sm">{post.description}</p>
        </motion.div>
      </motion.div>
    </Link>
  );
}
