import CommentList from '@/features/post/components/CommentList';
import PostTitle from '@/features/post/components/PostTitle';
import { getPost } from '@/features/post/lib';
import TableOfContent from '@/features/post/components/TableOfContent';
import { evaluate, EvaluateOptions } from 'next-mdx-remote-client/rsc';
import remarkFlexibleToc from 'remark-flexible-toc';
import rehypePrettyCode from 'rehype-pretty-code';
import readingTime, { ReadTimeResults } from 'reading-time';
import { Toc } from '@/features/post/types';
import { incrementViewCount } from '@/features/post/lib/incrementViewCount';
import { Suspense } from 'react';
import { components } from '@/shared/components/mdx';

export default async function PostPage({ params }: { params: { slug: string[] } }) {
  const [id] = params.slug;
  const postId = parseInt(id);

  const post = await getPost(postId);
  incrementViewCount(postId).catch(error => {
    console.error(error);
  });

  const options: EvaluateOptions = {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [remarkFlexibleToc],
      rehypePlugins: [[rehypePrettyCode]],
      development: process.env.NODE_ENV === 'development',
    },
    scope: {
      readingTime: readingTime(post.content),
    },
    vfileDataIntoScope: 'toc',
  };

  const { content, scope } = await evaluate({
    source: post.content,
    options,
    components,
  });

  return (
    <article className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      <Suspense fallback={<div></div>}>
        <PostTitle
          title={post.title}
          date={post.createdAt}
          readingTime={scope.readingTime as ReadTimeResults}
          views={post.views}
        />
        <div className="flex gap-8">
          <div className="prose prose-lg max-w-none flex-1 dark:prose-invert">{content}</div>
          <TableOfContent toc={scope.toc as Toc[]} />
        </div>
      </Suspense>
      <CommentList />
    </article>
  );
}
