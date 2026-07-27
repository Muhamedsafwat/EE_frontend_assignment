import { MinusIcon, PlusIcon } from "@/components/ui/icons";
import { requiredIds } from "@/catalog";
import { useBuilderStore } from "../store/builder.store";
import { selectQuantity } from "../store/selectors";

interface QuantityStepperProps {
  productId: string;
  variantId?: string;
  styleVariant: 'builder' | 'review'
}

function QuantityStepper({ productId, variantId, styleVariant }: QuantityStepperProps) {
  const quantity = useBuilderStore(selectQuantity(productId, variantId));
  const incrementQuantity = useBuilderStore((s) => s.incrementQuantity);
  const decrementQuantity = useBuilderStore((s) => s.decrementQuantity);

  const isRequired = requiredIds.has(productId);

  return (
    <div className="inline-flex items-center">
      <button
        type="button"
        onClick={() => decrementQuantity(productId, variantId)}
        disabled={isRequired || quantity == 0}
        aria-label="Decrease quantity"
        className={`p-1 rounded-sm text-ink-muted border-2 disabled:cursor-not-allowed ${styleVariant === "builder" ? "bg-[#E6EBF0]  border-[#E6EBF0]  disabled:bg-white disabled:text-[#E6EBF0]" : " bg-white border-white disabled:bg-[#E6EBF0] disabled:border-[#CED6DE]"} `}
      >
        <MinusIcon className="h-3 w-3" />
      </button>
      <span className="min-w-6 text-center text-sm text-ink">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => incrementQuantity(productId, variantId)}
        className={`p-1 rounded-sm text-ink-muted border-2 disabled:cursor-not-allowed ${styleVariant === "builder" ? "bg-[#E6EBF0]  border-[#E6EBF0]  disabled:bg-white disabled:text-[#E6EBF0]" : " bg-white border-white disabled:bg-[#E6EBF0] disabled:border-[#CED6DE]"} `}
      >
        <PlusIcon className="h-3 w-3" />
      </button>
    </div>
  );
}

export default QuantityStepper;
