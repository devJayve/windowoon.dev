'use client';
import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';

interface MermaidDiagramProps {
  diagram: string;
}

export default function MermaidDiagram({ diagram }: MermaidDiagramProps) {
  const { resolvedTheme } = useTheme();
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !mermaidRef) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme === 'dark' ? 'dark' : 'neutral',
      securityLevel: 'loose',
    });

    if (mermaidRef.current) {
      mermaidRef.current.innerHTML = '';

      const diagramId = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
      mermaid.render(diagramId, diagram).then(({ svg }) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = svg;
        }
      });
    }
  }, [mounted, diagram, resolvedTheme]);

  if (!mounted) return <div></div>;

  return <div ref={mermaidRef} className="mermaid" />;
}
