import { formatCurrency } from "@/lib/formatCurrency";

type PriceVariant = "builder" | "review";

interface PriceTagProps {
  price: number;
  comparedAtPrice?: number;
  // Appended to both prices, e.g. "/mo" for subscription plans.
  suffix?: string;
  variant?: PriceVariant;
  className?: string;
}

const styleByVariant: Record<PriceVariant, { compared: string; price: string }> =
  {
    builder: { compared: "type-price-compared", price: "type-price" },
    review: {
      compared: "type-review-price-compared line-through",
      price: "type-review-price",
    },
  };

function PriceTag({
  price,
  comparedAtPrice,
  suffix = "",
  variant = "builder",
  className = "",
}: PriceTagProps) {
  const style = styleByVariant[variant];
  const isFree = price === 0;

  return (
    <div className={`text-right leading-tight ${className}`}>
      {comparedAtPrice != null && (
        <div className={style.compared}>
          {formatCurrency(comparedAtPrice)}
          {suffix}
        </div>
      )}
      <div className={style.price}>
        {isFree ? "FREE" : `${formatCurrency(price)}${suffix}`}
      </div>
    </div>
  );
}

export default PriceTag;
