import { Comment as CommentType } from '@/features/comment/types';
import { cn } from '@/shared/lib/cn';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate } from '@/shared/lib/date';
import ReplyInput from '@/features/comment/components/ReplyInput';
import CommentControl from '@/features/comment/components/CommentControl';

interface CommentProps {
  isReply?: boolean;
  postId: number;
  comment: CommentType;
}

function Comment({ postId, isReply, comment }: CommentProps) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-md p-2 space-y-2',
        isReply ? 'ml-2' : 'border-0.5 border-neutral-600',
      )}
    >
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="size-8">
            <AvatarImage src={comment.user.image || ''} alt={comment.user.image || ''} />
            <AvatarFallback>{comment.user.name}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-semibold">{comment.user.name}</p>
          <p className="text-xs font-light dark:text-neutral-300">
            {formatDate(comment.createdAt)}
          </p>
        </div>
        <CommentControl commentId={comment.id} />
      </div>
      <div className="p-4 text-sm">{comment.content}</div>
      {isReply || (
        <div className="mr-2 flex justify-end">
          <p className="text-xs font-light text-neutral-700 dark:text-neutral-300">
            답글 {comment.replies?.length || 0}개
          </p>
        </div>
      )}
      {!isReply && comment.replies && (
        <div>
          {comment.replies.map(reply => (
            <Comment key={reply.id} postId={postId} comment={reply} isReply />
          ))}
        </div>
      )}
      {!isReply && <ReplyInput postId={postId} parentId={comment.id} />}
    </div>
  );
}

export default Comment;
