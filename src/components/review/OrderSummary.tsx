import type { Selection } from "@/types/builder/Selection.interface";
import Thumbnail from "@/components/ui/Thumbnail";
import PriceTag from "@/components/ui/PriceTag";
import { TruckIcon } from "@/components/ui/icons";
import { formatCurrency } from "@/lib/formatCurrency";

interface OrderSummaryProps {
  plan: Selection;
  shipping: Selection;
  summary: {
    comparedAtTotal: number;
    total: number;
    monthly: number;
    savings: number;
  };
}

/** Decorative satisfaction-guarantee seal. */
function GuaranteeSeal() {
  return (
    <img
      src="/assets/badges/satisfaction_badge.png"
      alt="100% Satisfaction Guarantee"
      className="h-16 w-16"
    />
  );
}

function OrderSummary({ plan, shipping, summary }: OrderSummaryProps) {
  return (
    <div className="space-y-4">
      {/* Plan */}
      <div className="border-t border-indigo-100 pt-3">
        <h3 className="text-xs font-medium uppercase tracking-wide text-muted">
          Plan
        </h3>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <Thumbnail src={plan.product.image} alt={plan.product.name} className="h-9 w-9" />
            <span className="text-sm font-semibold text-ink">
              {plan.product.name}
            </span>
          </div>
          <PriceTag
            price={plan.product.price}
            comparedAtPrice={plan.product.comparedAtPrice}
            suffix="/mo"
            variant="review"
          />
        </div>
      </div>

      {/* Shipping */}
      <div className="flex items-center justify-between border-t border-indigo-100 pt-3">
        <div className="flex items-center gap-2 text-sm font-medium text-ink">
          <TruckIcon className="h-5 w-5 text-wyze-purple" />
          {shipping.product.name}
        </div>
        <PriceTag
          price={shipping.product.price}
          comparedAtPrice={shipping.product.comparedAtPrice}
          variant="review"
        />
      </div>

      {/* Guarantee + total */}
      <div className="flex items-center justify-between border-t border-indigo-100 pt-4">
        <GuaranteeSeal />
        <div className="text-right">
          <span className="mb-1 inline-block rounded-md bg-wyze-purple px-2 py-1 text-xs font-medium text-white">
            as low as {formatCurrency(summary.monthly)}/mo
          </span>
          <div className="flex items-center justify-end gap-2">
            <span className="text-sm text-muted line-through">
              {formatCurrency(summary.comparedAtTotal)}
            </span>
            <span className="text-2xl font-bold text-wyze-purple">
              {formatCurrency(summary.total)}
            </span>
          </div>
        </div>
      </div>

      <p className="text-center text-sm font-medium text-wyze-purple">
        Congrats! You're saving {formatCurrency(summary.savings)} on your security bundle!
      </p>

      <button
        type="button"
        className="w-full rounded-lg bg-wyze-purple py-3 text-base font-semibold text-white hover:bg-wyze-purple/90"
      >
        Checkout
      </button>
      <button
        type="button"
        className="w-full text-center text-sm italic text-ink-muted underline hover:text-ink"
      >
        Save my system for later
      </button>
    </div>
  );
}

export default OrderSummary;
