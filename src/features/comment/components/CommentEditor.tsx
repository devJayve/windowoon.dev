'use client';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Button } from '@/shared/components/button/button';
import { codeEdit, codePreview, ICommand } from '@uiw/react-md-editor';
import { useRouter } from 'next/navigation';
import { createComment } from '@/features/comment/lib/createComment';
import { InfoDialog } from '@/shared/components/dialog/InfoDialog';
import { useSession } from 'next-auth/react';

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

  const isAuthenticated = status === 'authenticated';

  const handleContent = (content: string | undefined) => {
    setContent(content || '');
  };

  const handleCommentSubmit = async () => {
    if (!isAuthenticated || !session?.user?.id) {
      router.push('/login');
      return;
    }

    try {
      await createComment({ content, postId, userId: session.user.id, parentId });

      setInfoDialog({
        isOpen: true,
        title: '댓글이 등록되었어요',
      });
    } catch (error) {
      setInfoDialog({
        isOpen: true,
        title: '댓글 등록에 실패했어요',
      });
      setContent('');
      console.error(error);
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
      <div className="md-editor-wrapper">
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
          <Button size="sm" onClick={handleCommentSubmit}>
            {isAuthenticated ? '댓글 등록' : '로그인 후 작성하기'}
          </Button>
        </div>
      </div>
      <InfoDialog
        title={infoDialog.title}
        isOpen={infoDialog.isOpen}
        onClose={() => setInfoDialog(prev => ({ ...prev, isOpen: false }))}
      />
    </>
  );
}

export default CommentEditor;
