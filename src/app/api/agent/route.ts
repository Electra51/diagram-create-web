import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a diagram creation expert. 
When the user asks to create or modify a diagram, you MUST respond with valid Mermaid.js code inside triple backticks with the "mermaid" language tag.

Rules:
- Always wrap Mermaid code in \`\`\`mermaid ... \`\`\`
- Support: flowchart, sequenceDiagram, erDiagram, gantt, classDiagram, gitGraph
- Keep code clean and valid
- After the code block, briefly explain what you created
- For edits, return the FULL updated code, not just the changed parts`;

export async function POST(req: NextRequest) {
  const { messages, currentCode } = await req.json();

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    system:
      SYSTEM_PROMPT +
      (currentCode
        ? `\n\nCurrent diagram code:\n\`\`\`mermaid\n${currentCode}\n\`\`\``
        : ""),
    messages,
  });

  return NextResponse.json({
    content:
      response.content[0].type === "text" ? response.content[0].text : "",
  });
}
