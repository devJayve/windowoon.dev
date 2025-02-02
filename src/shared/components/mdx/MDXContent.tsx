import { EvaluateOptions, MDXRemote } from 'next-mdx-remote-client/rsc';
import { mdxComponents } from '@/shared/components/mdx/mdxComponents';

interface MdxContentProps {
  source: string;
  options: EvaluateOptions;
}

export default async function MDXContent({ source, options }: MdxContentProps) {
  return (
    <div className="prose prose-lg max-w-none flex-1 dark:prose-invert">
      <MDXRemote source={source} options={options} components={mdxComponents} />
    </div>
  );
}
