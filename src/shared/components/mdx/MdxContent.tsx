import { MdxContentProps } from '@/shared/types/mdx';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import rehypePrettyCode, { type Options } from 'rehype-pretty-code';

const prettyCodeOptions: Options = {};

export default function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="relative">
      <div className="mb-8">
        <MDXRemote
          source={source}
          options={{
            mdxOptions: {
              rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
            },
          }}
        />
      </div>
    </div>
  );
}
