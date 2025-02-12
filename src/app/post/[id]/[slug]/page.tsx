import CommentList from '@/features/comment/components/CommentList';
import PostTitle from '@/features/post/components/PostTitle';
import { getPost } from '@/features/post/lib';
import { evaluate } from 'next-mdx-remote-client/rsc';
import { TocItem } from 'remark-flexible-toc';
import { ReadTimeResults } from 'reading-time';
import { incrementViewCount } from '@/features/post/lib/incrementViewCount';
import { Suspense } from 'react';
import { components } from '@/shared/components/mdx';
import Toc from '@/shared/components/mdx/Toc';
import { createEvaluateOptions } from '@/features/post/lib/createEvaluateOptions';

interface PostDetailPageProps {
  params: {
    id: string;
    slug: string;
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const postId = parseInt(params.id);

  const post = await getPost(postId);
  incrementViewCount(postId).catch(error => {
    console.error(error);
  });

  const { content, scope } = await evaluate({
    source: post.content,
    options: createEvaluateOptions(post),
    components,
  });

  return (
    <article className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      <PostTitle
        postId={post.id}
        title={post.title}
        date={post.createdAt}
        readingTime={scope.readingTime as ReadTimeResults}
        views={post.views}
      />
      <div className="flex gap-8">
        <div className="prose max-w-none flex-1 dark:prose-invert">{content}</div>
        <Toc toc={scope.toc as TocItem[]} ordered={true} indented={true} />
      </div>
      <Suspense>
        <CommentList postId={postId} />
        {/*<GiscusCommentList />*/}
      </Suspense>
    </article>
  );
}
