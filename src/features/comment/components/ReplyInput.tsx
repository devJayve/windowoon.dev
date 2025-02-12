'use client';
import React, { useState } from 'react';
import CommentEditor from '@/features/comment/components/CommentEditor';
import { Input } from '@/shared/components/input/Input';
import { useRouter } from 'next/navigation';

interface ReplyInputProps {
  postId: number;
  parentId: number;
  isAuthenticated: boolean;
}

function ReplyInput({ postId, parentId, isAuthenticated }: ReplyInputProps) {
  const [openReplyEditor, setOpenReplyEditor] = useState(false);
  const router = useRouter();

  const handleCancelClick = () => {
    setOpenReplyEditor(false);
  };

  const handleInputClick = () => {
    if (!isAuthenticated) {
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
