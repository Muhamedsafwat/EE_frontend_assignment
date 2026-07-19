import type { Selection } from "@/types/builder/Selection.interface";
import Thumbnail from "@/components/ui/Thumbnail";
import QuantityStepper from "@/components/ui/QuantityStepper";
import PriceTag from "@/components/ui/PriceTag";

interface ReviewLineItemProps {
  selection: Selection;
}

function ReviewLineItem({ selection }: ReviewLineItemProps) {
  const { product, variant, quantity } = selection;
  const image = variant?.image ?? product.image ?? product.variants?.[0]?.image;

  return (
    <li className="flex items-center gap-3 py-3">
      <Thumbnail src={image} alt={product.name} className="h-9 w-9" />
      <p className="flex-1 text-sm font-medium text-slate-800">
        {product.name}
        {product.isRequired && <span className="text-slate-400"> (Required)</span>}
      </p>
      <QuantityStepper value={quantity} />
      <PriceTag
        price={product.price}
        comparedAtPrice={product.comparedAtPrice}
        variant="review"
        className="w-16"
      />
    </li>
  );
}

export default ReviewLineItem;
