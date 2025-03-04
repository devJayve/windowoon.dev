import CommentEditor from '@/features/comment/components/CommentEditor';
import Comment from '@/features/comment/components/Comment';
import { getComments } from '@/features/comment/lib/getComments';

interface CommentListProps {
  postId: number;
}

async function CommentList({ postId }: CommentListProps) {
  const result = await getComments(postId);

  return (
    <div className="space-y-4">
      <div>
        <p className="font-semibold">댓글 {result.length}개</p>
      </div>
      <CommentEditor postId={postId} />
      {result.comments.map(comment => {
        return <Comment key={comment.id} postId={postId} comment={comment} />;
      })}
    </div>
  );
}

export default CommentList;
