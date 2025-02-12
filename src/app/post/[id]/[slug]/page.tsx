import CommentList from '@/features/post/components/CommentList';
import DevCommentList from '@/features/comment/components/DevCommentList';
import PostTitle from '@/features/post/components/PostTitle';
import { getPost } from '@/features/post/lib';
import { evaluate, EvaluateOptions } from 'next-mdx-remote-client/rsc';
import remarkFlexibleToc, { TocItem } from 'remark-flexible-toc';
import rehypePrettyCode, { type Options } from 'rehype-pretty-code';
import readingTime, { ReadTimeResults } from 'reading-time';
import { incrementViewCount } from '@/features/post/lib/incrementViewCount';
import { Suspense } from 'react';
import { components } from '@/shared/components/mdx';
import Toc from '@/shared/components/mdx/Toc';
import rehypeSlug from 'rehype-slug';
import remarkFlexibleContainers, {
  type FlexibleContainerOptions,
} from 'remark-flexible-containers';

interface PostDetailPageProps {
  params: {
    id: string;
    slug: string;
  };
}

const prettyCodeOptions: Options = {
  theme: {
    dark: 'github-dark-high-contrast',
    light: 'github-light',
  },
  defaultLang: {
    inline: 'javascript',
  },
};

function toTitleCase(str: string | undefined) {
  if (!str) return;

  return str.replace(/\b\w+('\w{1})?/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const postId = parseInt(params.id);

  const post = await getPost(postId);
  incrementViewCount(postId).catch(error => {
    console.error(error);
  });

  const options: EvaluateOptions = {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [
        [
          remarkFlexibleContainers,
          {
            title: () => null,
            containerTagName: 'admonition',
            containerProperties: (type, title) => {
              return {
                ['data-type']: type?.toLowerCase(),
                ['data-title']: title ?? toTitleCase(type),
              };
            },
          } as FlexibleContainerOptions,
        ],
        remarkFlexibleToc,
      ],
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeSlug],
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
      </Suspense>

      <DevCommentList postId={postId} />
      <CommentList />
    </article>
  );
}
