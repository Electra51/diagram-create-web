'use client';

import React, { useState } from 'react';
import { useDiagramStore } from '@/store/useDiagramStore';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowUp } from 'lucide-react';

export default function PromptPanel() {
  const { aiPrompt, setAiPrompt, setDiagramCode } = useDiagramStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);

    // Mock API Delay
    setTimeout(() => {
      let newCode = '';
      const lowerPrompt = aiPrompt.toLowerCase();

      if (lowerPrompt.includes('database') || lowerPrompt.includes('schema') || lowerPrompt.includes('er')) {
        newCode = `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses`;
      } else if (lowerPrompt.includes('sequence') || lowerPrompt.includes('login') || lowerPrompt.includes('flow')) {
        newCode = `sequenceDiagram
    actor User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Enter credentials
    Frontend->>Backend: POST /api/login
    Backend->>Database: Fetch user
    Database-->>Backend: User data
    Backend-->>Frontend: Set JWT / HTTP 200
    Frontend-->>User: Redirect to Dashboard`;
      } else if (lowerPrompt.includes('git')) {
        newCode = `gitGraph
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit`;
      } else if (lowerPrompt.includes('pie') || lowerPrompt.includes('chart')) {
        newCode = `pie
    "Frontend" : 40
    "Backend" : 30
    "Database" : 20
    "DevOps" : 10`;
      } else {
        // Generic Fallback Graph Response
        newCode = `graph TD;
    A[${aiPrompt.substring(0, 20)}...] --> B{Process};
    B --> C[Result 1];
    B --> D[Result 2];`;
      }

      setDiagramCode(newCode);
      setAiPrompt('');
      setIsGenerating(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="flex flex-col gap-3 border-b bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <Sparkles className="h-4 w-4 text-blue-600" />
        AI Assistant (Mock)
      </div>

      <div className="relative">
        <Textarea
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe a diagram (e.g., login sequence, database schema)..."
          className="min-h-[80px] resize-none pr-12 pb-4 text-sm shadow-sm transition-colors focus-visible:ring-blue-500 rounded-xl"
        />
        <Button
          size="icon"
          disabled={isGenerating || !aiPrompt.trim()}
          onClick={handleGenerate}
          className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isGenerating ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <ArrowUp className="h-4 w-4 text-white" />
          )}
        </Button>
      </div>

      <p className="text-xs text-slate-400">
        Shift + Enter to add a new line. Try asking for "login sequence" or "database schema".
      </p>
    </div>
  );
}
