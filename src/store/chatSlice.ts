import { ChatMessage } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
}

const initialState: ChatState = {
  messages: [],
  isLoading: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: {
      reducer(state, action: PayloadAction<ChatMessage>) {
        state.messages.push(action.payload);
      },
      prepare(msg: Omit<ChatMessage, "id" | "timestamp">) {
        return {
          payload: {
            ...msg,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
          } satisfies ChatMessage,
        };
      },
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    clearChat(state) {
      state.messages = [];
    },
  },
});

export const { addMessage, setLoading, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
