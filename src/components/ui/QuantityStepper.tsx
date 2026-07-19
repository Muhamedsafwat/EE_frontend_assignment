import { MinusIcon, PlusIcon } from "./icons";

interface QuantityStepperProps {
  value: number;
}

/** Presentational quantity control. Wiring is intentionally left out (UI only). */
function QuantityStepper({ value }: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center rounded-md border border-slate-200 bg-white">
      <button
        type="button"
        aria-label="Decrease quantity"
        className="px-2 py-1.5 text-icon hover:text-ink-muted"
      >
        <MinusIcon className="h-3 w-3" />
      </button>
      <span className="min-w-6 text-center text-sm text-ink">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="px-2 py-1.5 text-icon hover:text-ink-muted"
      >
        <PlusIcon className="h-3 w-3" />
      </button>
    </div>
  );
}

export default QuantityStepper;
