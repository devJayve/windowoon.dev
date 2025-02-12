import CommentEditor from '@/features/comment/components/CommentEditor';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Ellipsis } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

function DevCommentList() {
  const commentCount = 0;
  return (
    <div className="space-y-4">
      <div>
        <p className="font-semibold">댓글 {commentCount}개</p>
      </div>
      <CommentEditor />
      <Comment isReply={false} />
      <Comment isReply={false} />
    </div>
  );
}

function Comment({ isReply = false }) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-md p-2',
        isReply ? 'ml-2' : 'border-0.5 border-neutral-600',
      )}
    >
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="size-8">
            <AvatarImage src={'/images/google_logo.png'} alt={'google'} />
            <AvatarFallback>김도운</AvatarFallback>
          </Avatar>
          <p className="text-sm font-semibold">DevJayve</p>
          <p className="text-xs font-light dark:text-neutral-300">2024년 5월 16일</p>
        </div>
        <Ellipsis className="size-4" />
      </div>
      <div className="p-4 text-sm">댓글 내용 테스트</div>
      {isReply || (
        <div className="mr-2 flex justify-end">
          <p className="text-xs font-light text-neutral-700 dark:text-neutral-300">답글 3개</p>
        </div>
      )}
      {!isReply && (
        <div>
          <Comment isReply />
          <Comment isReply />
          <Comment isReply />
        </div>
      )}
    </div>
  );
}

export default DevCommentList;
