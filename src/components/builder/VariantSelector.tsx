import type { Variant } from "@/types/data/Product.interface";
import Thumbnail from "@/components/ui/Thumbnail";

interface VariantSelectorProps {
  variants: Variant[];
}

/** Variant chips. The first one is shown as selected for display purposes only. */
function VariantSelector({ variants }: VariantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant, index) => (
        <button
          key={variant.id}
          type="button"
          className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs ${
            index === 0
              ? "border-slate-800 text-slate-900"
              : "border-slate-200 text-slate-500"
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
