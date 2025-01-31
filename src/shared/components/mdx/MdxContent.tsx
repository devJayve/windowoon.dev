import { EvaluateOptions, MDXRemote } from 'next-mdx-remote-client/rsc';

interface MdxContentProps {
  source: string;
  options: EvaluateOptions;
}

export default async function MdxContent({ source, options }: MdxContentProps) {
  return (
    <div className="prose prose-lg max-w-none flex-1 dark:prose-invert">
      <MDXRemote source={source} options={options} />
    </div>
  );
}
