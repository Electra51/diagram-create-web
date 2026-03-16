import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
  fontFamily: "Inter, sans-serif",
});

export function useMermaid(code: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current || !code.trim()) return;

    const render = async () => {
      try {
        setError(null);
        const id = `mermaid-${Date.now()}`;
        const { svg } = await mermaid.render(id, code);
        if (ref.current) ref.current.innerHTML = svg;
      } catch (err: any) {
        setError(err?.message ?? "Diagram error");
      }
    };

    render();
  }, [code]);

  return { ref, error };
}
