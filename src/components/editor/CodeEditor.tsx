'use client';

import React from 'react';
import Editor from '@monaco-editor/react';
import { useDiagramStore } from '@/store/useDiagramStore';

export default function CodeEditor() {
  const { diagramCode, setDiagramCode } = useDiagramStore();

  return (
    <div className="flex h-full w-full flex-col bg-[#1e1e1e]">
      <div className="flex px-4 py-2 bg-[#2d2d2d] border-b border-[#1e1e1e] text-xs font-medium text-slate-300">
        diagram.mmd
      </div>
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language="markdown"
          theme="vs-dark"
          value={diagramCode}
          onChange={(value) => setDiagramCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineHeight: 24,
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            formatOnPaste: true,
          } as any}
        />
      </div>
    </div>
  );
}
