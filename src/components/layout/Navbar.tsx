'use client';

import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { DownloadCloud, UploadCloud, Cpu } from 'lucide-react';
import { useDiagramStore } from '@/store/useDiagramStore';

interface NavbarProps {
  onExportPng: () => void;
  onExportSvg: () => void;
}

export default function Navbar({ onExportPng, onExportSvg }: NavbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setDiagramCode } = useDiagramStore();

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setDiagramCode(result);
      }
    };
    reader.readAsText(file);
    // reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <nav className="flex items-center justify-between border-b bg-white px-6 py-3 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center rounded-lg bg-blue-600 p-2 text-white">
          <Cpu size={20} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Diagram<span className="text-blue-600">AI</span>
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Hidden file input for import */}
        <input
          type="file"
          accept=".txt,.mmd"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImport}
        />

        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadCloud size={16} />
          Import
        </Button>

        <div className="flex gap-2 border-l pl-3 ml-1">
          <Button variant="default" size="sm" className="gap-2 bg-slate-900" onClick={onExportPng}>
            <DownloadCloud size={16} />
            Export PNG
          </Button>
          <Button variant="secondary" size="sm" className="gap-2" onClick={onExportSvg}>
            <DownloadCloud size={16} />
            SVG
          </Button>
        </div>
      </div>
    </nav>
  );
}
