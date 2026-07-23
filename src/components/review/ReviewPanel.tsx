import ReviewSection from "./ReviewSection";
import OrderSummary from "./OrderSummary";

import { getReviewItems } from "@/selectors/getReviewItems";
import { getOrderSummary } from "@/selectors/getOrderSummary";

function ReviewPanel() {
  const sections = getReviewItems();
  const { shipping, summary } = getOrderSummary();

  return (
    <aside className="h-fit rounded-2xl bg-surface p-6 lg:sticky lg:top-8">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        Review
      </p>
      <h2 className="mt-1 text-2xl font-bold text-ink">
        Your security system
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>
       <div className="mt-6 space-y-4">
        {sections.map((section) => (
          <ReviewSection
            key={section.title}
            title={section.title}
            items={section.items}
          />
        ))}
        <OrderSummary shipping={shipping} summary={summary} />
      </div>
    </aside>
  );
}

export default ReviewPanel;
