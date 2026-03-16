// const CodeEditor = () => {
//   return <div>Monaco editor</div>;
// };

// export default CodeEditor;
"use client";
import { updateDiagramCode } from "@/store/diagramSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectActiveDiagram } from "@/store/selectors";
import dynamic from "next/dynamic";

// Monaco editor SSR বন্ধ রাখো
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export function CodeEditor() {
  const diagram = useAppSelector(selectActiveDiagram);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b text-sm font-medium text-gray-600">
        Mermaid code
      </div>
      <div className="flex-1">
        <MonacoEditor
          height="100%"
          language="markdown"
          value={diagram.code}
          // onChange এ:
          onChange={(val) =>
            val && dispatch(updateDiagramCode({ id: diagram.id, code: val }))
          }
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: "on",
            wordWrap: "on",
            scrollBeyondLastLine: false,
            padding: { top: 12 },
          }}
        />
      </div>
    </div>
  );
}
