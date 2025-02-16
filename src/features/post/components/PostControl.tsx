'use client';
import { Button } from '@/shared/components/button/button';
import Link from 'next/link';
import { deletePost } from '../lib/deletePost';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface PostControlProps {
  postId: number;
}

interface ControlButtonProps {
  title: string;
  href?: string;
  onClick?: () => void;
}

function PostControl({ postId }: PostControlProps) {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session || session.user?.role !== 'admin') return null;

  const handlePostDelete = async () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      try {
        await deletePost(postId);

        alert('삭제되었습니다.');
        router.push('/post');
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="absolute right-0 flex items-center text-sm">
      <ControlLink title="통계" />
      <ControlLink title="수정" href={`/post/${postId}/edit`} />
      <ControlLink title="숨김" />
      <ControlLink title="삭제" onClick={handlePostDelete} />
    </div>
  );
}

function ControlLink({ title, href, onClick }: ControlButtonProps) {
  return (
    <Button
      className="px-1 text-neutral-700 dark:text-neutral-300"
      variant="link"
      size="sm"
      disabled={!href && !onClick}
      asChild={Boolean(href)}
      onClick={onClick}
    >
      {href ? <Link href={href}>{title}</Link> : title}
    </Button>
  );
}

export default PostControl;
