import { db } from '@/db/drizzle';
import { CommentReactionTable, CommentTable, UserTable } from '@/db/schema';
import { and, eq, inArray } from 'drizzle-orm';
import { Comment, CommentReaction } from '@/features/comment/types';
import { unstable_cache } from 'next/cache';

export async function getComments(postId: number): Promise<Comment[]> {
  return unstable_cache(async () => {
    const commentsWithUsers = await db
      .select({
        id: CommentTable.id,
        postId: CommentTable.postId,
        content: CommentTable.content,
        status: CommentTable.status,
        parentId: CommentTable.parentId,
        createdAt: CommentTable.createdAt,
        updatedAt: CommentTable.updatedAt,
        user: {
          id: CommentTable.userId,
          name: UserTable.name,
          email: UserTable.email,
          image: UserTable.image,
        },
      })
      .from(CommentTable)
      .leftJoin(UserTable, eq(CommentTable.userId, UserTable.id))
      .where(and(eq(CommentTable.postId, postId), eq(CommentTable.status, 'published')));

    const commentIds = commentsWithUsers.map(comment => comment.id);

    const reactions = await db
      .select()
      .from(CommentReactionTable)
      .where(and(inArray(CommentReactionTable.commentId, commentIds)));

    const reactsByCommentId = reactions.reduce(
      (acc, reaction) => {
        if (!acc[reaction.commentId]) {
          acc[reaction.commentId] = [];
        }
        acc[reaction.commentId].push(reaction);
        return acc;
      },
      {} as Record<number, CommentReaction[]>,
    );

    const parentComments: Comment[] = [];
    const childComments = new Map<number, Comment[]>();

    commentsWithUsers.forEach(comment => {
      const commentWithReactions = {
        ...comment,
        reactions: reactsByCommentId[comment.id] || [],
        replies: [],
      };

      if (!comment.parentId) {
        parentComments.push(commentWithReactions);
      } else {
        if (!childComments.has(comment.parentId)) {
          childComments.set(comment.parentId, []);
        }
        childComments.get(comment.parentId)!.push(commentWithReactions);
      }
    });

    parentComments.forEach(parent => {
      parent.replies = childComments.get(parent.id) || [];
    });

    return parentComments;
  })();
}
