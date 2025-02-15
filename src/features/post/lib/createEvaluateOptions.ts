import { FlexibleContainerOptions } from 'remark-flexible-containers';
import remarkFlexibleContainers from 'remark-flexible-containers';
import remarkFlexibleToc from 'remark-flexible-toc';
import rehypePrettyCode, { type Options } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { Post } from '@/features/post/types';
import readingTime from 'reading-time';
import { EvaluateOptions } from 'next-mdx-remote-client/rsc';

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

export const createEvaluateOptions = (post: Post): EvaluateOptions => ({
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins: [
      [
        remarkFlexibleContainers,
        {
          title: () => null,
          containerTagName: 'admonition',
          containerProperties: (type, title) => ({
            ['data-type']: type?.toLowerCase(),
            ['data-title']: title ?? toTitleCase(type),
          }),
        } as FlexibleContainerOptions,
      ],
      remarkFlexibleToc,
    ],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeSlug],
  },
  scope: {
    readingTime: readingTime(post.content),
  },
  vfileDataIntoScope: 'toc',
});
