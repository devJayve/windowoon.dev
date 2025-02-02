import { type MDXComponents } from 'next-mdx-remote-client';
import { MDXImage } from '@/shared/components/mdx/MDXImage';

export const mdxComponents: MDXComponents = {
  img: MDXImage,
};
