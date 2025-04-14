'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/shared/components/button/button';
import MDEditor, { codeEdit, codePreview, ICommand } from '@uiw/react-md-editor';
import { InfoDialog } from '@/shared/components/dialog/InfoDialog';
import { useSession } from 'next-auth/react';
import { submitCommentAction } from '@/features/comment/action/submitCommentAction';
import { useFormState, useFormStatus } from 'react-dom';
import { GuestFormData, GuestFormDialog } from '@/shared/components/dialog/GuestFormDialog';
import { useModal } from '@/shared/provider/ModalProvider';

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
  const formRef = useRef<HTMLFormElement>(null);
  const { resolvedTheme } = useTheme();
  const { openModal } = useModal();
  const { status, data: session } = useSession();
  const [content, setContent] = useState('');
  const [mounted, setMounted] = useState(false);
  const [infoDialog, setInfoDialog] = useState({
    isOpen: false,
    title: '',
  });

  const createComment = submitCommentAction.bind(null, postId, parentId);
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!isAuthenticated) {
      e.preventDefault();

      const result = await openModal<GuestFormData>(<GuestFormDialog />);

      if (!result || !formRef.current) {
        return;
      }

      const formData = new FormData(formRef.current);

      formData.append('username', result.name);
      formData.append('password', result.password);

      formAction(formData);
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

  if (!mounted) {
    return <div></div>;
  }

  return (
    <>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={handleCommentSubmit}
        className="md-editor-wrapper"
      >
        <input type="hidden" name="content" value={content} />
        <MDEditor
          data-color-mode={resolvedTheme === 'dark' ? 'dark' : 'light'}
          value={content}
          onChange={handleContent}
          commands={[mCodeEdit, mCodePreview]}
          extraCommands={[]}
          height={height}
          preview="edit"
          textareaProps={{
            placeholder: '댓글 작성하기',
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
