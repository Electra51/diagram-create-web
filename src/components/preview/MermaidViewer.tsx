'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useDiagramStore } from '@/store/useDiagramStore';
import { AlertCircle } from 'lucide-react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// Initialize mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'inherit',
});

interface MermaidViewerProps {
  viewerRef: React.RefObject<HTMLDivElement | null>;
}

export default function MermaidViewer({ viewerRef }: MermaidViewerProps) {
  const { diagramCode } = useDiagramStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        if (!viewerRef.current || !diagramCode) return;

        setError(null);
        viewerRef.current.removeAttribute('data-processed');

        // Use a unique ID for rendering to avoid conflicts
        const id = `mermaid-svg-${Date.now()}`;
        const { svg } = await mermaid.render(id, diagramCode);

        if (viewerRef.current) {
          viewerRef.current.innerHTML = svg;
        }
      } catch (err: any) {
        console.error('Mermaid render error:', err);
        setError(err.message || 'Syntax error in Mermaid code');
      }
    };

    renderDiagram();
  }, [diagramCode, viewerRef]);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    });
  }, []); // ← initialize inside component

  return (
    <div className="relative flex h-full w-full bg-slate-50/50 overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none" />

      <TransformWrapper
        initialScale={1}
        minScale={0.1}
        maxScale={4}
        centerOnInit={true}
        wheel={{ step: 0.1 }}
      >
        <TransformComponent wrapperClass="!w-full !h-full absolute inset-0" contentClass="!w-full !h-full flex items-center justify-center p-8">
          {/* Target Div for Mermaid */}
          <div
            ref={viewerRef as React.RefObject<HTMLDivElement>}
            className="mermaid z-10 transition-all duration-300 cursor-grab active:cursor-grabbing w-full h-full flex justify-center items-center"
          />
        </TransformComponent>
      </TransformWrapper>

      {/* Error Overlay */}
      {error && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex max-w-md items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-lg animate-in fade-in slide-in-from-bottom-4">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div className="flex-1 font-medium overflow-hidden text-ellipsis whitespace-nowrap">
            {error.split('\n')[0]}
          </div>
        </div>
      )}
    </div>
  );
}
