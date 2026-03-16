import { RootState } from "./index";

export const selectAllDiagrams = (state: RootState) => state.diagrams.diagrams;

export const selectActiveDiagramId = (state: RootState) =>
  state.diagrams.activeDiagramId;

// Active diagram object টা directly পাওয়ার selector
export const selectActiveDiagram = (state: RootState) => {
  const { diagrams, activeDiagramId } = state.diagrams;
  return diagrams.find((d) => d.id === activeDiagramId) ?? null;
};

export const selectChatMessages = (state: RootState) => state.chat.messages;

export const selectIsAgentLoading = (state: RootState) => state.chat.isLoading;
