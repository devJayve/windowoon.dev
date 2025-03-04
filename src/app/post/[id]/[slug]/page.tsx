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
import PostLikeButton from '@/features/post/components/PostLikeButton';
import { getPostLikes } from '@/features/post/lib/getPostLikes';

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
  const { count: likeCount, isLiked } = await getPostLikes(postId);
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
        likes={likeCount}
      />
      <Suspense>
        <div className="relative gap-8 lg:flex">
          <div className="prose prose-neutral w-full max-w-3xl dark:prose-invert">{content}</div>
          <Toc toc={scope.toc as TocItem[]} />
        </div>
      </Suspense>
      <div className="flex items-center gap-2">
        <Tag size={18} />
        {post.categories.map(category => (
          <CategoryItem className="py-1 font-semibold" category={category} key={category} />
        ))}
      </div>
      <div className="h-[0.5px] w-full bg-foreground/50" />

      <PostLikeButton
        initialLikeState={{
          isLiked: isLiked,
          likeCount: likeCount,
        }}
        postId={postId}
      />
      <Suspense>
        <CommentList postId={postId} />
      </Suspense>
    </article>
  );
}
