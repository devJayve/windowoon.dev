import nodemailer from 'nodemailer';
import { db } from '@/db/drizzle';
import { PostTable, UserTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

function createCommentNotificationEmail(
  postTitle: string,
  commenterName: string,
  commentContent: string,
  postUrl: string,
) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
      <h2>새 댓글 알림</h2>
      <p><strong>${postTitle}</strong> 글에 새로운 댓글이 작성되었습니다.</p>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <p style="margin: 0 0 10px 0;"><strong>${commenterName}</strong>님의 댓글:</p>
        <p style="margin: 0;">${commentContent}</p>
      </div>
      <p><a href="${postUrl}" style="background-color: #1c1c1c; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold">댓글 확인하기</a></p>
    </div>
  `;
}

// 댓글 알림 이메일 발송 함수
export async function sendCommentNotification(
  postId: number,
  userId: string,
  commentContent: string,
) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'your-email@example.com';

    const [post] = await db
      .select({
        id: PostTable.id,
        title: PostTable.title,
        slug: PostTable.slug,
      })
      .from(PostTable)
      .where(eq(PostTable.id, postId))
      .limit(1);

    const [user] = await db
      .select({
        username: UserTable.name,
      })
      .from(UserTable)
      .where(eq(UserTable.id, userId))
      .limit(1);

    // 게시물 URL 생성
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const postUrl = `${siteUrl}/posts/${post.slug}`;

    // 이메일 내용 생성 및 발송
    const emailHtml = createCommentNotificationEmail(
      post.title,
      user.username || '익명',
      commentContent,
      postUrl,
    );

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST!,
      port: parseInt(process.env.EMAIL_PORT!),
      secure: Boolean(process.env.EMAIL_SECURE!),
      auth: {
        user: process.env.EMAIL_APP_USER!,
        pass: process.env.EMAIL_APP_PASSWORD!,
      },
    });

    await transporter.sendMail({
      from: 'windowoon.dev',
      to: adminEmail,
      subject: `[블로그 알림] '${post.title}' 글에 새 댓글이 달렸습니다.`,
      html: emailHtml,
    });
  } catch (error) {
    console.error('Failed to send comment notification email:', error);
  }
}
