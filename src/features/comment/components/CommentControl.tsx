'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React, { useState } from 'react';
import { Ellipsis } from 'lucide-react';
import { InfoDialog } from '@/shared/components/dialog/InfoDialog_v2';
import { deleteCommentAction } from '@/features/comment/action/deleteCommentAction';
import { getSession } from '@/features/auth/action/getSession';
import { useModal } from '@/shared/provider/ModalProvider';
import {
  GuestConfirmData,
  GuestConfirmDialog,
} from '@/shared/components/dialog/GuestConfirmDialog';
import { ServerActionState } from '@/features/comment/types';

interface CommentControlProps {
  commentId: number;
}

function CommentControl({ commentId }: CommentControlProps) {
  const [pending, setPending] = useState(false);
  const { openModal } = useModal();

  const handleDelete = async () => {
    setPending(true);

    const session = await getSession();
    let dialogResult: ServerActionState<null>;

    if (!session) {
      const result = await openModal<GuestConfirmData>(<GuestConfirmDialog />);

      if (!result) {
        setPending(false);
        return;
      }

      dialogResult = await deleteCommentAction(commentId, result.password);
    } else {
      dialogResult = await deleteCommentAction(commentId);
    }

    await openModal(<InfoDialog title={dialogResult.message} />);

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
    </>
  );
}

export default CommentControl;
