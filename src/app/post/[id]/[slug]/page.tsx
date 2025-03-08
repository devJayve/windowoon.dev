import CommentList from '@/features/comment/components/CommentList';
import PostTitle from '@/features/post/components/PostTitle';
import { getAllPosts, getPost } from '@/features/post/lib';
import { TocItem } from 'remark-flexible-toc';
import readingTime from 'reading-time';
import React, { Suspense } from 'react';
import Toc from '@/shared/components/mdx/Toc';
import CategoryItem from '@/features/category/components/CategoryItem';
import { evaluate } from 'next-mdx-remote-client/rsc';
import { createEvaluateOptions } from '@/features/post/lib/createEvaluateOptions';
import { components } from '@/shared/components/mdx';
import { Tag } from 'lucide-react';
import Divider from '@/shared/components/divider';
import PostNavigator from '@/features/post/components/PostNavigator';
import PostLikeButton from '@/features/post/components/PostLikeButton';
import GithubIssueButton from '@/features/post/components/GithubIssueButton';

interface PostDetailPageProps {
  params: {
    id: string;
    slug: string;
  };
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map(post => ({
    id: String(post.id),
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostDetailPageProps) {
  const postId = parseInt(params.id);
  const post = await getPost(postId);

  return {
    title: post.title,
    description: post.description,
    keywords: post.categories,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      locale: 'ko_KR',
      url: `https://windowoon.dev/post/${params.id}/${params.slug}`,
      siteName: "Windowoon's Log",
      images: [
        {
          url: 'https://8kaup4frtn8k4vpk.public.blob.vercel-storage.com/blog_thumbnail-S2TFhB6NRM1yhpo6JxKd6ACeAH60Cr.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const postId = parseInt(params.id);

  const post = await getPost(postId);
  const readTime = readingTime(post.content);

  const { content, scope } = await evaluate({
    source: post.content,
    options: createEvaluateOptions(),
    components,
  });

  return (
    <article className="mx-auto max-w-3xl space-y-8 px-6 lg:max-w-6xl lg:py-8">
      <PostTitle postId={post.id} title={post.title} date={post.createdAt} readingTime={readTime} />

      <section className="relative gap-8 lg:flex">
        <div className="prose prose-neutral w-full max-w-3xl dark:prose-invert">{content}</div>
        <Toc toc={scope.toc as TocItem[]} />
      </section>

      <section className="flex items-center gap-2">
        <Tag size={18} />
        {post.categories.map(category => (
          <CategoryItem className="py-1 font-semibold" category={category} key={category} />
        ))}
      </section>

      <div className="flex flex-col gap-2">
        <GithubIssueButton postId={postId} title={post.title} />
        <Divider />
      </div>

      <Suspense>
        <PostNavigator currentPost={post} />
      </Suspense>

      <PostLikeButton postId={postId} />

      <Suspense>
        <CommentList postId={postId} />
      </Suspense>
    </article>
  );
}
