import React from 'react';
import { Button } from '@/shared/components/button/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

async function PostControl() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'admin') return null;
  return (
    <div className="absolute right-0 flex items-center text-sm">
      <ControlButton title="통계" />
      <ControlButton title="수정" />
      <ControlButton title="삭제" />
    </div>
  );
}

function ControlButton({ title }: { title: string }) {
  return (
    <Button className="px-1 text-neutral-700 dark:text-neutral-300" variant="link" size="sm">
      {title}
    </Button>
  );
}

export default PostControl;
