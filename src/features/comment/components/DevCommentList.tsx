import CommentEditor from '@/features/comment/components/CommentEditor';
import Comment from '@/features/comment/components/Comment';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/config';
import { getComments } from '@/features/comment/lib/getComments';

interface CommentListProps {
  postId: number;
}

async function DevCommentList({ postId }: CommentListProps) {
  const session = await getServerSession(authOptions);
  const comments = await getComments(postId);

  return (
    <div className="space-y-4">
      <div>
        <p className="font-semibold">댓글 {comments.length}개</p>
      </div>
      <CommentEditor postId={postId} />
      {comments.map(comment => {
        return (
          <Comment
            key={comment.id}
            postId={postId}
            comment={comment}
            isAuthenticated={!!session?.user}
          />
        );
      })}
    </div>
  );
}

export default DevCommentList;
