// export default function Home() {
//   return <div>Diagram design</div>;
// }

import { AgentPanel } from "@/component/agent/AgentPanel";
import { CodeEditor } from "@/component/editor/CodeEditor";
import DiagramPreview from "@/component/editor/DiagramPreview";
import Sidebar from "@/component/layout/Sidebar";
import Toolbar from "@/component/layout/Toolbar";

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      {/* Top toolbar */}
      <Toolbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left: diagram list */}
        <Sidebar />

        {/* Center-left: AI agent */}
        <div className="w-72 flex-shrink-0 flex flex-col overflow-hidden border-r">
          <AgentPanel />
        </div>

        {/* Center-right: code editor + preview split */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden border-b">
            <CodeEditor />
          </div>
          <div className="flex-1 overflow-hidden">
            <DiagramPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
