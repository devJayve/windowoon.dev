import { getAllPosts } from '@/features/post/lib';
import PostItem from '@/features/post/components/PostItem';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

const FloatingActionButton = dynamic(
  () => import('@/shared/components/button/FloatingActionButton'),
  { ssr: true },
);

export const metadata: Metadata = {
  title: "Windowoon's Log | 글 목록",
  description: '개발 과정에서 마주친 도전과 인사이트를 기록합니다.',
  keywords: ['기술 블로그', '웹', '프론트엔드', 'Next.js', 'React', 'TypeScript'],
  openGraph: {
    title: "Windowoon's Log - 글 목록",
    description: '개발 과정에서 마주친 도전과 인사이트를 기록합니다.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://windowoon.dev/post',
    siteName: "Windowoon's Log",
    images: [
      {
        url: 'https://8kaup4frtn8k4vpk.public.blob.vercel-storage.com/blog_thumbnail-S2TFhB6NRM1yhpo6JxKd6ACeAH60Cr.png',
        width: 1200,
        height: 630,
        alt: "Windowoon's Log",
      },
    ],
  },
};

export default async function PostPage() {
  const allPosts = await getAllPosts();

  return (
    <>
      <div className="mx-auto max-w-3xl">
        {allPosts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
      <FloatingActionButton href="/post/create" />
    </>
  );
}
