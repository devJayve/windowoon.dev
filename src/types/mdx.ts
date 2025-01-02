import { HTMLAttributes, ReactNode } from 'react';

export interface MdxComponentProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
}

export interface CodeBlockProps extends MdxComponentProps {
  inline?: boolean;
  language?: string;
}

export interface MDXImageProps extends MdxComponentProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface MdxContentProps {
  source: string;
}
