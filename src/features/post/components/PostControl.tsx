import { Button } from '@/shared/components/button/button';
import Link from 'next/link';
import { authOptions } from '@/features/auth/config';
import { getServerSession } from 'next-auth';

interface PostControlProps {
  postId: number;
}

interface ControlButtonProps {
  title: string;
  href?: string;
}

async function PostControl({ postId }: PostControlProps) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'admin') return null;

  return (
    <div className="absolute right-0 flex items-center text-sm">
      <ControlLink title="통계" />
      <ControlLink title="수정" href={`/post/${postId}/edit`} />
      <ControlLink title="숨김" />
    </div>
  );
}

function ControlLink({ title, href }: ControlButtonProps) {
  const buttonProps = {
    className: 'px-1 text-neutral-700 dark:text-neutral-300',
    variant: 'link' as const,
    size: 'sm' as const,
    disabled: !href,
  };

  return (
    <Button {...buttonProps} asChild={Boolean(href)}>
      {href ? <Link href={href}>{title}</Link> : title}
    </Button>
  );
}

export default PostControl;
