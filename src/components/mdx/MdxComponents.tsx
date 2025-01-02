import { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { cn } from '@/lib/utils';
import { CodeBlockProps, MdxComponentProps } from '@/types/mdx';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

// <h2> 커스텀 컴포넌트
const Heading2 = ({ children, className, ...props }: MdxComponentProps) => (
  <h2
    className={cn('mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-gray-100', className)}
    {...props}
  >
    {children}
  </h2>
);

// <p> 커스텀 리스트
const Paragraph = ({ children, className, ...props }: MdxComponentProps) => (
  <p className={cn('mb-4 leading-relaxed text-gray-700 dark:text-gray-300', className)} {...props}>
    {children}
  </p>
);

// 비정렬 리스트 커스텀 컴포넌트
const UnorderedList = ({ children, className, ...props }: MdxComponentProps) => (
  <ul
    className={cn(
      'mb-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300',
      className,
    )}
    {...props}
  >
    {children}
  </ul>
);

// 정렬 리스트 커스텀 컴포넌트
const OrderedList = ({ children, className, ...props }: MdxComponentProps) => (
  <ol
    className={cn(
      'mb-4 list-inside list-decimal space-y-2 text-gray-700 dark:text-gray-300',
      className,
    )}
    {...props}
  >
    {children}
  </ol>
);

// <a> 태그 커스텀 컴포넌트
export const Anchor = ({ children, className, ...props }: MdxComponentProps) => (
  <a className={cn('text-blue-600 hover:underline dark:text-blue-400', className)} {...props}>
    {children}
  </a>
);

// > 인용문 커스텀 컴포넌트
const Blockquote = ({ children, className, ...props }: MdxComponentProps) => (
  <blockquote
    className={cn(
      'my-4 border-l-4 border-gray-300 pl-4 italic text-gray-700 dark:border-gray-700 dark:text-gray-300',
      className,
    )}
    {...props}
  >
    {children}
  </blockquote>
);

// 코드블럭 커스텀 컴포넌트
const CodeBlock = ({ children, className }: CodeBlockProps) => {
  const code = String(children).trim();
  const language = className ? className.replace('language-', '') : 'text';
  return (
    <div className="group relative rounded-lg">
      <div className="absolute right-4 top-3 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Copy
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          padding: '1.5rem',
          fontSize: '0.875rem',
        }}
        showLineNumbers
        wrapLines
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

// 백틱(`)을 이용한 인라인 코드 커스텀 컴포넌트
const InlineCode = ({ children, className }: CodeBlockProps) => {
  const inline = String(children).replace(/`/g, '').trim();

  return (
    <span
      className={cn(
        'rounded-md bg-gray-100 px-1.5 py-0.5 dark:bg-gray-800',
        'font-mono text-sm text-gray-900 dark:text-gray-100',
        className,
      )}
    >
      {inline}
    </span>
  );
};

const CodeComponent = ({ inline, children, className }: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <CodeBlock className={className} language={match[1]}>
      {children}
    </CodeBlock>
  ) : (
    <InlineCode className={className}>{children}</InlineCode>
  );
};

// MDX 이미지 처리를 위한 커스텀 컴포넌트
const MDXImage = ({
  src = '',
  alt = '',
  width,
  height,
}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
  // 상대 경로로 지정된 이미지 소스를 절대 경로로 변환
  const imagePath = src.startsWith('./') ? src.slice(2) : src;
  const imageWidth = typeof width === 'string' ? parseInt(width) : width || 800;
  const imageHeight = typeof height === 'string' ? parseInt(height) : height || 600;

  return (
    <div className="relative my-8 w-full">
      <Image
        src={imagePath}
        alt={alt}
        width={imageWidth}
        height={imageHeight}
        className="rounded-lg"
        quality={90}
      />
    </div>
  );
};

export const components: MDXComponents = {
  h2: Heading2,
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  a: Anchor,
  blockquote: Blockquote,
  code: CodeComponent,
  img: MDXImage,
};
