import { Diagram, DiagramType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_CODE = `graph TD
    A[Start] --> B{Is it?}
    B -- Yes --> C[OK]
    B -- No --> D[Not OK]`;

interface DiagramState {
  diagrams: Diagram[];
  activeDiagramId: string | null;
}

const initialState: DiagramState = {
  diagrams: [
    {
      id: "default",
      name: "My first diagram",
      code: DEFAULT_CODE,
      type: "flowchart",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ],
  activeDiagramId: "default",
};

export const diagramSlice = createSlice({
  name: "diagrams",
  initialState,
  reducers: {
    createDiagram: {
      reducer(state, action: PayloadAction<Diagram>) {
        state.diagrams.push(action.payload);
        state.activeDiagramId = action.payload.id;
      },
      // prepare callback দিয়ে id + timestamp automatically generate হবে
      prepare(name: string = "Untitled", type: DiagramType = "flowchart") {
        return {
          payload: {
            id: crypto.randomUUID(),
            name,
            type,
            code: DEFAULT_CODE,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          } satisfies Diagram,
        };
      },
    },

    deleteDiagram(state, action: PayloadAction<string>) {
      state.diagrams = state.diagrams.filter((d) => d.id !== action.payload);
      // delete করলে প্রথম diagram active করো
      state.activeDiagramId = state.diagrams[0]?.id ?? null;
    },

    setActiveDiagram(state, action: PayloadAction<string>) {
      state.activeDiagramId = action.payload;
    },

    updateDiagramCode(
      state,
      action: PayloadAction<{ id: string; code: string }>,
    ) {
      const diagram = state.diagrams.find((d) => d.id === action.payload.id);
      if (diagram) {
        diagram.code = action.payload.code;
        diagram.updatedAt = Date.now();
      }
    },

    renameDiagram(state, action: PayloadAction<{ id: string; name: string }>) {
      const diagram = state.diagrams.find((d) => d.id === action.payload.id);
      if (diagram) {
        diagram.name = action.payload.name;
      }
    },
  },
});

export const {
  createDiagram,
  deleteDiagram,
  setActiveDiagram,
  updateDiagramCode,
  renameDiagram,
} = diagramSlice.actions;

export default diagramSlice.reducer;
