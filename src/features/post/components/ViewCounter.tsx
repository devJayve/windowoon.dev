'use client';
import React, { useEffect } from 'react';
import { Eye } from 'lucide-react';
import { incrementViewCount } from '../lib/incrementViewCount';

interface ViewCounterProps {
  postId: number;
  views: number;
}

function ViewCounter({ views, postId }: ViewCounterProps) {
  useEffect(() => {
    incrementViewCount(postId).catch(console.error);
  }, [postId]);

  return (
    <div className="flex items-center gap-1">
      <Eye size={15} />
      {views}
    </div>
  );
}

export default ViewCounter;
