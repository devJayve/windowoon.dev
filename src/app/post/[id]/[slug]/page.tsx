import CommentList from '@/features/comment/components/CommentList';
import PostTitle from '@/features/post/components/PostTitle';
import { getAllPosts, getPost } from '@/features/post/lib';
import { TocItem } from 'remark-flexible-toc';
import readingTime from 'reading-time';
import { Suspense } from 'react';
import Toc from '@/shared/components/mdx/Toc';
import CategoryItem from '@/features/category/components/CategoryItem';
import { evaluate } from 'next-mdx-remote-client/rsc';
import { createEvaluateOptions } from '@/features/post/lib/createEvaluateOptions';
import { components } from '@/shared/components/mdx';
import { Tag } from 'lucide-react';
import Divider from '@/shared/components/divider';
import PostNavigator from '@/features/post/components/PostNavigator';
import dynamic from 'next/dynamic';

const PostLikeToggle = dynamic(() => import('@/features/post/components/PostLikeToggle'), {
  ssr: true,
});

interface PostDetailPageProps {
  params: {
    id: string;
    slug: string;
  };
}

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
      <PostTitle
        postId={post.id}
        title={post.title}
        date={post.createdAt}
        readingTime={readTime}
        views={post.views}
      />

      <Suspense>
        <section className="relative gap-8 lg:flex">
          <div className="prose prose-neutral w-full max-w-3xl dark:prose-invert">{content}</div>
          <Toc toc={scope.toc as TocItem[]} />
        </section>
      </Suspense>

      <section className="flex items-center gap-2">
        <Tag size={18} />
        {post.categories.map(category => (
          <CategoryItem className="py-1 font-semibold" category={category} key={category} />
        ))}
      </section>

      <Divider />

      <Suspense>
        <PostNavigator currentPost={post} />
      </Suspense>

      <Suspense>
        <PostLikeToggle postId={postId} />
        <CommentList postId={postId} />
      </Suspense>
    </article>
  );
}
