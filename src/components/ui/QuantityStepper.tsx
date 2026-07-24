import { MinusIcon, PlusIcon } from "./icons";

import { useBuilderStore } from "@/store/builder.store";
import products from "@/data/products.json";

// required products are locked at a quantity of 1, their stepper is disabled
const requiredIds = new Set(
  products.filter((p) => p.isRequired).map((p) => p.id),
);

interface QuantityStepperProps {
  productId: string,
  variantId?: string
}


function QuantityStepper({ productId, variantId }: QuantityStepperProps) {

  const { incrementQuantity, decrementQuantity, selections} = useBuilderStore();

  const quantity = selections.find(s => s.productId === productId && (!variantId ? !s.variantId : s.variantId === variantId))?.quantity ?? 0;

  const isRequired = requiredIds.has(productId);


  return (
    <div className="inline-flex items-center rounded-md border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => decrementQuantity(productId, variantId) }
        disabled={isRequired}
        aria-label="Decrease quantity"
        className="px-2 py-1.5 text-icon hover:text-ink-muted disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-icon"
      >
        <MinusIcon className="h-3 w-3" />
      </button>
      <span className="min-w-6 text-center text-sm text-ink">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => incrementQuantity(productId, variantId)}
        disabled={isRequired}
        className="px-2 py-1.5 text-icon hover:text-ink-muted disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-icon"
      >
        <PlusIcon className="h-3 w-3" />
      </button>
    </div>
  );
}

export default QuantityStepper;
