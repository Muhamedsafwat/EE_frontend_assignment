import { MinusIcon, PlusIcon } from "./icons";

import { useBuilderStore } from "@/store/builder.store";

interface QuantityStepperProps {
  productId: string
}

/** Presentational quantity control. Wiring is intentionally left out (UI only). */
function QuantityStepper({ productId }: QuantityStepperProps) {

  const {activeVariants, incrementQuantity, decrementQuantity, selections} = useBuilderStore();
  const currentVariant = activeVariants[productId];

  const quantity = selections.find(s => s.productId == productId && s.variantId == currentVariant)?.quantity ?? 0;


  return (
    <div className="inline-flex items-center rounded-md border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => decrementQuantity(productId, currentVariant) }
        aria-label="Decrease quantity"
        className="px-2 py-1.5 text-icon hover:text-ink-muted"
      >
        <MinusIcon className="h-3 w-3" />
      </button>
      <span className="min-w-6 text-center text-sm text-ink">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => incrementQuantity(productId, currentVariant)}
        className="px-2 py-1.5 text-icon hover:text-ink-muted"
      >
        <PlusIcon className="h-3 w-3" />
      </button>
    </div>
  );
}

export default QuantityStepper;
