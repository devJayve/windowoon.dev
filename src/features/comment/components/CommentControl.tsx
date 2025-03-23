'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React, { useState } from 'react';
import { Ellipsis } from 'lucide-react';
import { InfoDialog } from '@/shared/components/dialog/InfoDialog';
import { deleteCommentAction } from '@/features/comment/action/deleteCommentAction';

interface CommentControlProps {
  commentId: number;
}

function CommentControl({ commentId }: CommentControlProps) {
  const [infoDialog, setInfoDialog] = useState({
    isOpen: false,
    title: '',
  });
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    setPending(true);

    const result = await deleteCommentAction(commentId);

    setInfoDialog({
      isOpen: true,
      title: result.message,
    });

    setPending(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled={pending} onSelect={handleDelete}>
            {pending ? '처리중...' : '삭제'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <InfoDialog
        title={infoDialog.title}
        isOpen={infoDialog.isOpen}
        onClose={() => setInfoDialog(prev => ({ ...prev, isOpen: false }))}
      />
    </>
  );
}

export default CommentControl;
