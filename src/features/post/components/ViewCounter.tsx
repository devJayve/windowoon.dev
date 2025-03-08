'use client';
import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { countViewAction } from '../action/countViewAction';
import { getViewAction } from '@/features/post/action/getViewAction';

interface ViewCounterProps {
  postId: number;
}

function ViewCounter({ postId }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);
  useEffect(() => {
    countViewAction(postId).catch(console.error);
    getViewAction(postId).then(setViews).catch(console.error);
  }, [postId]);

  return (
    <div className="flex items-center gap-1">
      <Eye size={15} />
      {views}
    </div>
  );
}

export default ViewCounter;
