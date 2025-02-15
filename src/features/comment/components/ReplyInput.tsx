'use client';
import React, { useState } from 'react';
import CommentEditor from '@/features/comment/components/CommentEditor';
import { Input } from '@/shared/components/input/Input';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface ReplyInputProps {
  postId: number;
  parentId: number;
}

function ReplyInput({ postId, parentId }: ReplyInputProps) {
  const [openReplyEditor, setOpenReplyEditor] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  const handleCancelClick = () => {
    setOpenReplyEditor(false);
  };

  const handleInputClick = () => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }
    setOpenReplyEditor(true);
  };

  return openReplyEditor ? (
    <CommentEditor
      postId={postId}
      parentId={parentId}
      height={100}
      showCancel
      onCancel={handleCancelClick}
    />
  ) : (
    <div onClick={handleInputClick}>
      <Input
        readOnly
        placeholder="답변을 작성하세요"
        className="placeholder:text-sm placeholder:font-light"
      />
    </div>
  );
}

export default ReplyInput;
