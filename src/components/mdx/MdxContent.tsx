import { MdxContentProps } from '@/types/mdx';
import { MDXRemote } from 'next-mdx-remote-client/rsc';

export default function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="relative">
      <div className="mb-8">
        <MDXRemote source={source} />
      </div>
    </div>
  );
}
