import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/config';
import { PostReactionTable } from '@/db/schema';
import { db } from '@/db/drizzle';
import { and, eq } from 'drizzle-orm';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // postId 파라미터 가져오기
  const postId = parseInt(params.id);

  console.log('GET', postId);

  // 사용자 세션 확인
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  // 좋아요 수 카운트
  const count = await db
    .select()
    .from(PostReactionTable)
    .where(eq(PostReactionTable.postId, postId))
    .then(result => result.length);

  // 로그인하지 않은 경우
  if (!userId) {
    return NextResponse.json({
      count,
      isLiked: false,
    });
  }

  // 사용자의 좋아요 상태 확인
  const [isLiked] = await db
    .select()
    .from(PostReactionTable)
    .where(and(eq(PostReactionTable.postId, postId), eq(PostReactionTable.userId, userId)))
    .limit(1);

  return NextResponse.json({
    count,
    isLiked: !!isLiked,
  });
}
