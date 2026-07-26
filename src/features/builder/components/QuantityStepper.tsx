import { MinusIcon, PlusIcon } from "@/components/ui/icons";
import { requiredIds } from "@/catalog";
import { useBuilderStore } from "../store/builder.store";
import { selectQuantity } from "../store/selectors";

interface QuantityStepperProps {
  productId: string;
  variantId?: string;
}

function QuantityStepper({ productId, variantId }: QuantityStepperProps) {
  const quantity = useBuilderStore(selectQuantity(productId, variantId));
  const incrementQuantity = useBuilderStore((s) => s.incrementQuantity);
  const decrementQuantity = useBuilderStore((s) => s.decrementQuantity);

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
