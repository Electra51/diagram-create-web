export type DiagramType =
  | "flowchart"
  | "sequenceDiagram"
  | "erDiagram"
  | "gantt"
  | "classDiagram"
  | "gitGraph";

export interface Diagram {
  id: string;
  name: string;
  code: string;
  type: DiagramType;
  createdAt: number;
  updatedAt: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  diagramId?: string; //diagramid
  timestamp: number;
}
