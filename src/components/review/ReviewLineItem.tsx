import { ReviewItem } from "@/selectors/getReviewItems";
import Thumbnail from "@/components/ui/Thumbnail";
import QuantityStepper from "@/components/ui/QuantityStepper";
import PriceTag from "@/components/ui/PriceTag";

interface ReviewLineItemProps {
  item: ReviewItem;
}

function ReviewLineItem({ item }: ReviewLineItemProps) {
  const { product, variant } = item;
   const image = variant?.image ?? product.image ?? product.variants?.[0]?.image;

  return (
    <li className="flex items-center gap-3 py-3">
       <Thumbnail src={image} alt={product.name} className="h-9 w-9" /> 
      <p className="flex-1 text-sm font-medium text-ink">
        { product.id} {variant?.id ? `(${variant?.id})` : ""}
         {product.isRequired && <span className="text-muted"> (Required)</span>}
      </p>
      <QuantityStepper variantId={variant?.id || ""} productId={product.id} />
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
