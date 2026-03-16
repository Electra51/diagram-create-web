import { toPng, toSvg } from "html-to-image";

export function useExport() {
  const exportAsPng = async (element: HTMLElement, filename = "diagram") => {
    const dataUrl = await toPng(element, { quality: 0.95, pixelRatio: 2 });
    downloadFile(dataUrl, `${filename}.png`);
  };

  const exportAsSvg = async (element: HTMLElement, filename = "diagram") => {
    const dataUrl = await toSvg(element);
    downloadFile(dataUrl, `${filename}.svg`);
  };

  // .mmd file export — শুধু code টা save করে
  const exportAsMmd = (code: string, filename = "diagram") => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    downloadFile(url, `${filename}.mmd`);
    URL.revokeObjectURL(url);
  };

  // .mmd file import
  const importFromMmd = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".mmd,.txt";
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return reject("No file");
        const reader = new FileReader();
        reader.onload = (ev) => resolve(ev.target?.result as string);
        reader.readAsText(file);
      };
      input.click();
    });
  };

  return { exportAsPng, exportAsSvg, exportAsMmd, importFromMmd };
}

function downloadFile(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}
