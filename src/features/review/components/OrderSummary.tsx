import PriceTag from "@/components/ui/PriceTag";
import Thumbnail from "@/components/ui/Thumbnail";
import GuaranteeSeal from "@/components/ui/GuaranteeSeal";
import { formatCurrency } from "@/lib/formatCurrency";
import type { OrderTotals } from "@/catalog/pricing";
import type { ReviewItem } from "../types/ReviewItem.interface";

interface OrderSummaryProps {
  shipping?: ReviewItem;
  summary: OrderTotals;
}

function OrderSummary({ shipping, summary }: OrderSummaryProps) {
  return (
    <div className="space-y-4">
      {/* Shipping */}
      {shipping && (
        <div className="flex items-center justify-between border-t border-indigo-100 pt-3">
          <div className="flex items-center gap-2 text-sm font-medium text-ink">
            <Thumbnail
              src="/assets/icons/delivery.svg"
              alt={shipping.product.name}
              className="h-10 w-10 p-1 bg-white"
            />
            {shipping.product.name}
          </div>
          <PriceTag
            price={shipping.product.price}
            comparedAtPrice={shipping.product.comparedAtPrice}
            variant="review"
          />
        </div>
      )}

      {/* Guarantee + total */}
      <div className="flex items-center justify-between border-t border-indigo-100 pt-4">
        <GuaranteeSeal />
        <div className="text-right">
          {summary.monthly > 0 && (
            <span className="mb-1 inline-block rounded-md bg-wyze-purple px-2 py-1 text-xs font-medium text-white">
              as low as {formatCurrency(summary.monthly)}/mo
            </span>
          )}
          <div className="flex items-center justify-end gap-2">
            {summary.comparedAtTotal > summary.total && (
              <span className="text-sm text-muted line-through">
                {formatCurrency(summary.comparedAtTotal)}
              </span>
            )}
            <span className="text-2xl font-bold text-wyze-purple">
              {formatCurrency(summary.total)}
            </span>
          </div>
        </div>
      </div>

      {summary.savings > 0 && (
        <p className="text-center text-sm font-medium text-wyze-purple">
          Congrats! You're saving {formatCurrency(summary.savings)} on your
          security bundle!
        </p>
      )}

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
