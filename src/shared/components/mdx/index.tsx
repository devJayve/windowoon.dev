import Image from 'next/image';
import Link from 'next/link';
import type { MDXComponents } from 'next-mdx-remote-client/rsc';

import Admonition, { admonition } from './Admonition';

export const components: MDXComponents = {
  Image,
  Link,
  admonition,
  Admonition,
};
