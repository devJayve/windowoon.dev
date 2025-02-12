'use client';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Button } from '@/shared/components/button/button';
import { codeEdit, codePreview, ICommand } from '@uiw/react-md-editor';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

function CommentEditor() {
  const { theme } = useTheme();
  const { status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState('');

  const isAuthenticated = status === 'authenticated';

  const handleContent = (content: string | undefined) => {
    setContent(content || '');
  };

  const handleCommentSubmit = () => {
    if (!isAuthenticated) {
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
    <div className="md-editor-wrapper">
      <MDEditor
        data-color-mode={theme === 'dark' ? 'dark' : 'light'}
        value={content}
        onChange={handleContent}
        commands={[mCodeEdit, mCodePreview]}
        extraCommands={[]}
        preview="edit"
        textareaProps={{
          placeholder: isAuthenticated ? '댓글 작성하기' : '로그인 후 댓글 작성하기',
          readOnly: !isAuthenticated,
        }}
      />
      <div className="mt-2 flex justify-end">
        <Button size="sm" onClick={handleCommentSubmit}>
          {isAuthenticated ? '댓글 등록' : '로그인 후 작성하기'}
        </Button>
      </div>
    </div>
  );
}

export default CommentEditor;
