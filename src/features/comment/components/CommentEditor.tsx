'use client';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/shared/components/button/button';
import { codeEdit, codePreview, ICommand } from '@uiw/react-md-editor';
import { useRouter } from 'next/navigation';
import { InfoDialog } from '@/shared/components/dialog/InfoDialog';
import { useSession } from 'next-auth/react';
import { createCommentAction } from '@/features/comment/lib/createCommentAction';
import { useFormState } from 'react-dom';

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
  const [state, formAction] = useFormState(createCommentAction, null);

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
        {isAuthenticated && <input type="hidden" name="userId" value={session.user.id!} />}
        {parentId && <input type="hidden" name="parentId" value={parentId} />}
        <input type="hidden" name="postId" value={postId} />
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
          <Button type="submit" size="sm">
            {isAuthenticated ? '댓글 등록' : '로그인 후 작성하기'}
          </Button>
        </div>
      </form>
      <InfoDialog
        title={infoDialog.title}
        isOpen={infoDialog.isOpen}
        onClose={() => setInfoDialog(prev => ({ ...prev, isOpen: false }))}
      />
    </>
  );
}

export default CommentEditor;
