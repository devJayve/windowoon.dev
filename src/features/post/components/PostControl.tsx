'use client';
import React from 'react';
import { Button } from '@/shared/components/button/button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface PostControlProps {
  postId: number;
}

interface ControlButtonProps {
  title: string;
  onClick?: () => void;
}

function PostControl({ postId }: PostControlProps) {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session || session.user?.role !== 'admin') return null;

  const handleEditClick = () => {
    router.push(`/post/${postId}/edit`);
  };

  return (
    <div className="absolute right-0 flex items-center text-sm">
      <ControlButton title="통계" />
      <ControlButton title="수정" onClick={handleEditClick} />
      <ControlButton title="숨김" />
    </div>
  );
}

function ControlButton({ title, onClick }: ControlButtonProps) {
  return (
    <Button
      className="px-1 text-neutral-700 dark:text-neutral-300"
      variant="link"
      size="sm"
      onClick={onClick}
    >
      {title}
    </Button>
  );
}

export default PostControl;
