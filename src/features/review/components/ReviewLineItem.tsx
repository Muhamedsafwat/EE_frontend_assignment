import Thumbnail from "@/components/ui/Thumbnail";
import PriceTag from "@/components/ui/PriceTag";
import { resolveProductImage } from "@/catalog/resolveProductImage";
import { lineComparedAtTotal, lineTotal } from "@/catalog/pricing";
import QuantityStepper from "@/features/builder/components/QuantityStepper";
import type { ReviewItem } from "../types/ReviewItem.interface";

interface ReviewLineItemProps {
  item: ReviewItem;
}

function ReviewLineItem({ item }: ReviewLineItemProps) {
  const { product, variant } = item;
  const image = resolveProductImage(product, variant?.id);

  return (
    <li className="flex items-center gap-3 py-3">
      <Thumbnail src={image} alt={product.name} className="h-9 w-9 bg-white" />
      <p className="type-review-item-title flex-1">
        {product.name} {variant?.name ? `(${variant.name})` : ""}
        {product.isRequired && <span className="text-muted"> (Required)</span>}
      </p>
      {product.category !== "plans" && (
        <QuantityStepper styleVariant="review" variantId={variant?.id} productId={product.id} />
      )}
      <PriceTag
        price={lineTotal(item)}
        comparedAtPrice={
          product.comparedAtPrice != null ? lineComparedAtTotal(item) : undefined
        }
        variant="review"
        className="w-16"
      />
    </li>
  );
}

export default ReviewLineItem;
