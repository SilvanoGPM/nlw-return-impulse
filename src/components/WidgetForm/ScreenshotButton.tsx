import { useState } from "react";
import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";

import { Loading } from "../Loading";

type ScreenshotButtonProps = {
  screenshot: string | null;
  onTakeScreenshotFinish: (screenshot: string | null) => void;
};

export function ScreenshotButton({
  screenshot,
  onTakeScreenshotFinish,
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    try {
      setIsTakingScreenshot(true);

      const canvas = await html2canvas(document.querySelector("html")!);
      const base64image = canvas.toDataURL("image/png");

      onTakeScreenshotFinish(base64image);
    } finally {
      setIsTakingScreenshot(false);
    }
  }

  function previewImage() {
    window.open(screenshot!);
  }

  function resetScreenshot() {
    onTakeScreenshotFinish(null);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        onClick={resetScreenshot}
        onAuxClick={previewImage}
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 transition-colors hover:text-zinc-100"
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: "bottom right",
          backgroundSize: 180,
        }}
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent transition-colors hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
    >
      {isTakingScreenshot ? (
        <Loading />
      ) : (
        <Camera className="w-6 h-6 text-zinc-100" />
      )}
    </button>
  );
}
