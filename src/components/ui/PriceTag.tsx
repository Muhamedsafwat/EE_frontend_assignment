import { formatCurrency } from "@/lib/formatCurrency";

type PriceVariant = "builder" | "review";

interface PriceTagProps {
  price: number;
  comparedAtPrice?: number;
  /** Appended to both prices, e.g. "/mo" for subscription plans. */
  suffix?: string;
  variant?: PriceVariant;
  className?: string;
}

const toneByVariant: Record<PriceVariant, { compared: string; price: string }> = {
  builder: { compared: "text-red-400", price: "text-rose-600" },
  review: { compared: "text-slate-400", price: "text-indigo-600" },
};

function PriceTag({
  price,
  comparedAtPrice,
  suffix = "",
  variant = "builder",
  className = "",
}: PriceTagProps) {
  const tone = toneByVariant[variant];
  const isFree = price === 0;

  return (
    <div className={`text-right leading-tight ${className}`}>
      {comparedAtPrice != null && (
        <div className={`text-xs line-through ${tone.compared}`}>
          {formatCurrency(comparedAtPrice)}
          {suffix}
        </div>
      )}
      <div className={`text-sm font-semibold ${tone.price}`}>
        {isFree ? "FREE" : `${formatCurrency(price)}${suffix}`}
      </div>
    </div>
  );
}

export default PriceTag;
