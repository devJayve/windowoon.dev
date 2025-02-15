'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

function GiscusCommentList() {
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://giscus.app/client.js';
    scriptElement.async = true;
    scriptElement.crossOrigin = 'anonymous';

    // comment configuration
    scriptElement.setAttribute('data-repo', 'devJayve/my-blog');
    scriptElement.setAttribute('data-repo-id', `${process.env.DATA_REPO_ID}`);
    scriptElement.setAttribute('data-category', 'Comments');
    scriptElement.setAttribute('data-category-id', `${process.env.DATA_CATEGORY_ID}`);
    scriptElement.setAttribute('data-mapping', `${pathname}`);
    scriptElement.setAttribute('data-strict', '0');
    scriptElement.setAttribute('data-reactions-enabled', '1');
    scriptElement.setAttribute('data-emit-metadata', '0');
    scriptElement.setAttribute('data-input-position', 'top');
    scriptElement.setAttribute('data-theme', resolvedTheme === 'dark' ? 'dark' : 'light');
    scriptElement.setAttribute('data-lang', 'ko');
    scriptElement.setAttribute('data-loading', 'lazy');

    ref.current.appendChild(scriptElement);
  }, []);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage({ giscus: {} }, 'https://giscus.app');
  }, []);

  return <section ref={ref} />;
}

export default GiscusCommentList;
