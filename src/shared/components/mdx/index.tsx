import Image from 'next/image';
import Link from 'next/link';
import type { MDXComponents } from 'next-mdx-remote-client/rsc';

import { admonition } from './Admonition';
import MermaidDiagram from '@/shared/components/mdx/MermaidDiagram';

export const components: MDXComponents = {
  Image,
  Link,
  admonition,
  MermaidDiagram,
};
