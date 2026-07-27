import Thumbnail from "@/components/ui/Thumbnail";
import type { Variant } from "@/types/Product.interface";
import { useBuilderStore } from "../store/builder.store";
import { selectActiveVariant } from "../store/selectors";

interface VariantSelectorProps {
  variants: Variant[];
  productId: string;
}

function VariantSelector({ variants, productId }: VariantSelectorProps) {
  const activeVariant = useBuilderStore(selectActiveVariant(productId));
  const setActiveVariant = useBuilderStore((s) => s.setActiveVariant);

  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => (
        <button
          onClick={() => setActiveVariant(productId, variant.id)}
          key={variant.id}
          type="button"
          className={`type-variant-title inline-flex items-center gap-1.5 rounded-md border px-2 py-1 ${
            activeVariant === variant.id ? "border-green-600" : "border-slate-200"
          }`}
        >
          <Thumbnail
            src={variant.image}
            alt={variant.name}
            className="h-4 w-4 rounded-sm"
          />
          {variant.name}
        </button>
      ))}
    </div>
  );
}

export default VariantSelector;
