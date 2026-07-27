import { useEffect, useState } from "react";
import { useBuilderStore } from "@/features/builder/store/builder.store";

type SaveStatus = "idle" | "saved" | "error";

const LABELS: Record<SaveStatus, string> = {
  idle: "Save my system for later",
  saved: "System saved — it'll be here next time",
  error: "Couldn't save your system, try again",
};

// How long the outcome stays up before the button offers to save again
const FEEDBACK_MS = 3000;

function SaveSystemButton() {
  const saveSystem = useBuilderStore((state) => state.saveSystem);
  const [status, setStatus] = useState<SaveStatus>("idle");

  // the timer outlives the click, so it has to be cleared if the panel
  // unmounts before it fires
  useEffect(() => {
    if (status === "idle") return;

    const timer = setTimeout(() => setStatus("idle"), FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <button
      type="button"
      onClick={() => setStatus(saveSystem() ? "saved" : "error")}
      aria-live="polite"
      className={`w-full text-center text-sm italic underline ${
        status === "error" ? "text-sale" : "text-ink-muted hover:text-ink"
      }`}
    >
      {LABELS[status]}
    </button>
  );
}

export default SaveSystemButton;
