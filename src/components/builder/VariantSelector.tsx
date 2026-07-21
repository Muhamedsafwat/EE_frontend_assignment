//store
import { useBuilderStore } from "@/store/builder.store";
// components
import Thumbnail from "@/components/ui/Thumbnail";
//types
import type { Variant } from "@/types/data/Product.interface";

//props
interface VariantSelectorProps {
  variants: Variant[];
  productId: string
}

function VariantSelector({ variants, productId }: VariantSelectorProps) {
  const { activeVariants, setActiveVariant } = useBuilderStore();

  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => (
        <button
        //active style
          
          onClick={() => setActiveVariant(productId,variant.id)}
          key={variant.id}
          type="button"
          className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs ${
            activeVariants[productId] === variant.id
              ? "border-green-600 text-ink"
              : "border-slate-200 text-ink-muted"
          }`}
        >
          <Thumbnail src={variant.image} alt={variant.name} className="h-4 w-4 rounded-sm" />
          {variant.name}
        </button>
      ))}
    </div>
  );
}

export default VariantSelector;
