import CommentEditor from '@/features/comment/components/CommentEditor';
import Comment from '@/features/comment/components/Comment';
import { getComments } from '@/features/comment/lib/getComments';

interface CommentListProps {
  postId: number;
}

async function CommentList({ postId }: CommentListProps) {
  // 2.
  const comments = await getComments(postId);
  const commentLength = comments.reduce((acc, comment) => {
    return acc + 1 + (comment.replies?.length || 0);
  }, 0);

  return (
    <div className="space-y-4">
      <div>
        <p className="font-semibold">댓글 {commentLength}개</p>
      </div>
      <CommentEditor postId={postId} />
      {comments.map(comment => {
        return <Comment key={comment.id} postId={postId} comment={comment} />;
      })}
    </div>
  );
}

export default CommentList;
