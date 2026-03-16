'use client';

import React, { useRef, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';
import PromptPanel from '@/components/ai/PromptPanel';
import CodeEditor from '@/components/editor/CodeEditor';
import MermaidViewer from '@/components/preview/MermaidViewer';

// Shadcn Resizable Components
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { toPng, toSvg } from 'html-to-image';
import { toast } from 'sonner';

export default function Home() {
  const viewerRef = useRef<HTMLDivElement>(null);

  const handleExportPng = useCallback(async () => {
    if (!viewerRef.current) return;
    try {
      const dataUrl = await toPng(viewerRef.current, {
        backgroundColor: '#ffffff',
        filter: (node) => {
          // Ignore external styles/fonts causing SecurityError
          if (node.tagName === 'LINK' || node.tagName === 'STYLE') return false;
          return true;
        }
      });
      const link = document.createElement('a');
      link.download = 'diagram.png';
      link.href = dataUrl;
      link.click();
      toast.success('Diagram exported as PNG');
    } catch (err) {
      console.error('Failed to export PNG', err);
      toast.error('Failed to export image');
    }
  }, []);

  const handleExportSvg = useCallback(async () => {
    if (!viewerRef.current) return;
    try {
      const dataUrl = await toSvg(viewerRef.current, {
        backgroundColor: '#ffffff',
        filter: (node) => {
          if (node.tagName === 'LINK' || node.tagName === 'STYLE') return false;
          return true;
        }
      });
      const link = document.createElement('a');
      link.download = 'diagram.svg';
      link.href = dataUrl;
      link.click();
      toast.success('Diagram exported as SVG');
    } catch (err) {
      console.error('Failed to export SVG', err);
      toast.error('Failed to export SVG');
    }
  }, []);

  return (
    <main className="flex h-screen w-screen flex-col overflow-hidden bg-white text-slate-900">
      {/* Header Area */}
      <Navbar onExportPng={handleExportPng} onExportSvg={handleExportSvg} />

      {/* Main Resizable Layout */}
      <div className="flex w-full overflow-hidden">


        {/* Left Panel: AI Control + Code Editor */}
        <div className="flex flex-col border-r h-full bg-white relative z-10 overflow-hidden">
          <PromptPanel />
          <div className="flex-1 overflow-hidden relative">
            <CodeEditor />
          </div>
        </div>

        {/* Resizable Handle / Divider */}
        {/* <ResizableHandle withHandle className="bg-slate-200" /> */}

        {/* Right Panel: Diagram Viewer */}
        <div className="h-full bg-slate-50 relative">
          <MermaidViewer viewerRef={viewerRef} />
        </div>


      </div>

    </main>
  );
}

