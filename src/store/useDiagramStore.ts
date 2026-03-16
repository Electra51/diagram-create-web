import { create } from 'zustand';

interface DiagramState {
  diagramCode: string;
  setDiagramCode: (code: string) => void;
  
  aiPrompt: string;
  setAiPrompt: (prompt: string) => void;
}

const DEFAULT_DIAGRAM = `graph TD;
    A[User Request] --> B{AI Agent};
    B -- Valid --> C[Generate Diagram];
    B -- Invalid --> D[Error Message];
    C --> E[Real-time Preview];
    E --> F[Export / Download];`;

export const useDiagramStore = create<DiagramState>((set) => ({
  diagramCode: DEFAULT_DIAGRAM,
  setDiagramCode: (code) => set({ diagramCode: code }),
  
  aiPrompt: '',
  setAiPrompt: (prompt) => set({ aiPrompt: prompt }),
}));
