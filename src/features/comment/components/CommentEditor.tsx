'use client';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/shared/components/button/button';
import { codeEdit, codePreview, ICommand } from '@uiw/react-md-editor';
import { useRouter } from 'next/navigation';
import { InfoDialog } from '@/shared/components/dialog/InfoDialog';
import { useSession } from 'next-auth/react';
import { createCommentAction } from '@/features/comment/action/createCommentAction';
import { useFormState, useFormStatus } from 'react-dom';
import { GuestFormDialog } from '@/shared/components/dialog/GuestFormDialog';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface CommentEditorProps {
  postId: number;
  parentId?: number;
  height?: number;
  showCancel?: boolean;
  onCancel?: () => void;
}

function CommentEditor({
  postId,
  parentId,
  height = 200,
  showCancel = false,
  onCancel,
}: CommentEditorProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const { status, data: session } = useSession();
  const [content, setContent] = useState('');
  const [infoDialog, setInfoDialog] = useState({
    isOpen: false,
    title: '',
  });

  const createComment = createCommentAction.bind(null, postId, parentId);
  const [state, formAction] = useFormState(createComment, null);

  const isAuthenticated = status === 'authenticated' && session?.user?.id !== null;

  const handleContent = (content: string | undefined) => {
    setContent(content || '');
  };

  useEffect(() => {
    if (state) {
      setInfoDialog({
        isOpen: true,
        title: state.message,
      });
      setContent('');
    }
  }, [state]);

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push('/login');
      return;
    }
  };

  const mCodeEdit: ICommand = {
    ...codeEdit,
    icon: <span>작성하기</span>,
  };

  const mCodePreview: ICommand = {
    ...codePreview,
    icon: <span>미리보기</span>,
  };

  return (
    <>
      <form action={formAction} onSubmit={handleCommentSubmit} className="md-editor-wrapper">
        <input type="hidden" name="content" value={content} />
        <MDEditor
          data-color-mode={theme === 'dark' ? 'dark' : 'light'}
          value={content}
          onChange={handleContent}
          commands={[mCodeEdit, mCodePreview]}
          extraCommands={[]}
          height={height}
          preview="edit"
          textareaProps={{
            placeholder: isAuthenticated ? '댓글 작성하기' : '로그인 후 댓글 작성하기',
            readOnly: !isAuthenticated,
          }}
        />
        <div className="mt-2 flex justify-end gap-2">
          {showCancel && (
            <Button variant="secondary" size="sm" onClick={onCancel}>
              취소
            </Button>
          )}
          <SubmitButton content={content} />
        </div>
      </form>
      <InfoDialog
        title={infoDialog.title}
        isOpen={infoDialog.isOpen}
        onClose={() => setInfoDialog(prev => ({ ...prev, isOpen: false }))}
      />
      <GuestFormDialog />
    </>
  );
}

function SubmitButton({ content }: { content: string }) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={content.trim().length === 0 || pending} type="submit" size="sm">
      {pending ? '등록중...' : '댓글 등록'}
    </Button>
  );
}

export default CommentEditor;
