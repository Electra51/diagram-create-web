// const AgentPanel = () => {
//   return <div>chat UI</div>;
// };

// export default AgentPanel;

"use client";
import { addMessage, setLoading } from "@/store/chatSlice";
import { updateDiagramCode } from "@/store/diagramSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectActiveDiagram,
  selectChatMessages,
  selectIsAgentLoading,
} from "@/store/selectors";
import { useState } from "react";

function extractMermaidCode(text: string): string | null {
  const match = text.match(/```mermaid\n([\s\S]*?)```/);
  return match ? match[1].trim() : null;
}

export function AgentPanel() {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();

  // Zustand-এর useDiagramStore() এর বদলে এখন individual selectors
  const messages = useAppSelector(selectChatMessages);
  const isLoading = useAppSelector(selectIsAgentLoading);
  const activeDiagram = useAppSelector(selectActiveDiagram);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    dispatch(addMessage({ role: "user", content: input }));
    setInput("");
    dispatch(setLoading(true));

    try {
      const apiMessages = [...messages, { role: "user", content: input }].map(
        (m) => ({ role: m.role, content: m.content }),
      );

      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          currentCode: activeDiagram?.code,
        }),
      });

      const data = await res.json();
      dispatch(addMessage({ role: "assistant", content: data.content }));

      const mermaidCode = extractMermaidCode(data.content);
      if (mermaidCode && activeDiagram) {
        dispatch(
          updateDiagramCode({ id: activeDiagram.id, code: mermaidCode }),
        );
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 border-r">
      <div className="p-3 border-b font-medium text-sm">AI Agent</div>

      {/* Messages */}
      {/* <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {chatHistory.map((msg: any) => (
          <div
            key={msg.id}
            className={`text-sm rounded-lg p-3 ${
              msg.role === "user"
                ? "bg-purple-100 ml-4 text-purple-900"
                : "bg-white border mr-4"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {isAgentLoading && (
          <div className="bg-white border rounded-lg p-3 mr-4 text-sm text-gray-400 animate-pulse">
            Generating diagram...
          </div>
        )}
      </div> */}

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            !e.shiftKey &&
            (e.preventDefault(), sendMessage())
          }
          placeholder="Create a login flow diagram..."
          className="flex-1 resize-none border rounded-lg p-2 text-sm h-20 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={sendMessage}
          //   disabled={isAgentLoading}
          className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
