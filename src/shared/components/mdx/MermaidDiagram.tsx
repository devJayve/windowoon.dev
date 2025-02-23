'use client';
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';

interface MermaidDiagramProps {
  diagram: string;
}

export default function MermaidDiagram({ diagram }: MermaidDiagramProps) {
  const { resolvedTheme } = useTheme();
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 테마가 변경될 때마다 mermaid 초기화
    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme === 'dark' ? 'dark' : 'neutral',
      securityLevel: 'loose',
    });

    if (mermaidRef.current) {
      mermaidRef.current.innerHTML = '';

      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
      mermaid.render(id, diagram).then(({ svg }) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = svg;
        }
      });
    }
  }, [diagram, resolvedTheme]);

  return <div ref={mermaidRef} className="mermaid" />;
}
