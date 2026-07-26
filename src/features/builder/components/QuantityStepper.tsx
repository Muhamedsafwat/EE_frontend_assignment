import { MinusIcon, PlusIcon } from "./icons";
import { useBuilderStore, requiredIds } from "@/store/builder.store";

interface QuantityStepperProps {
  productId: string;
  variantId?: string;
}

function QuantityStepper({ productId, variantId }: QuantityStepperProps) {
  const { incrementQuantity, decrementQuantity, selections } = useBuilderStore();

  const quantity = selections.find(
    (s) =>
      s.productId === productId &&
      (!variantId ? !s.variantId : s.variantId === variantId),
  )?.quantity ?? 0;

  const isRequired = requiredIds.has(productId);

  return (
    <div className="inline-flex items-center">
      <button
        type="button"
        onClick={() => decrementQuantity(productId, variantId)}
        disabled={isRequired}
        aria-label="Decrease quantity"
        className="p-1 rounded-sm text-ink-muted disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-icon bg-[#F0F4F7]"
      >
        <MinusIcon className="h-3 w-3" />
      </button>
      <span className="min-w-6 text-center text-sm text-ink">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => incrementQuantity(productId, variantId)}
        className="p-1 rounded-sm text-ink-muted bg-[#F0F4F7]"
      >
        <PlusIcon className="h-3 w-3" />
      </button>
    </div>
  );
}

export default QuantityStepper;
