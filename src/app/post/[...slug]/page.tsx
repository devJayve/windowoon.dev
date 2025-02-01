import MdxContent from '@/shared/components/mdx/MdxContent';
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

export default async function PostPage({ params }: { params: { slug: string[] } }) {
  const [id] = params.slug;
  const postId = parseInt(id);

  const [post] = await Promise.all([getPost(postId), incrementViewCount(postId)]);

  const options: EvaluateOptions = {
    mdxOptions: {
      remarkPlugins: [remarkFlexibleToc],
      rehypePlugins: [[rehypePrettyCode]],
    },
    scope: {
      readingTime: readingTime(post.content),
    },
    vfileDataIntoScope: 'toc',
  };

  const { scope } = await evaluate({ source: post.content, options });

  return (
    <article className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      <PostTitle
        title={post.title}
        date={post.createdAt}
        readingTime={scope.readingTime as ReadTimeResults}
        views={post.views}
      />
      <div className="flex gap-8">
        <MdxContent options={options} source={post.content} />
        <TableOfContent toc={scope.toc as Toc[]} />
      </div>
      <CommentList />
    </article>
  );
}
