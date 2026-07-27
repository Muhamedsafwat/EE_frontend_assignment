import { useOrderSummary } from "../hooks/useOrderSummary";
import { useReviewItems } from "../hooks/useReviewItems";
import OrderSummary from "./OrderSummary";
import ReviewSection from "./ReviewSection";

function ReviewPanel() {
  const sections = useReviewItems();
  const { shipping, summary } = useOrderSummary();

  return (
    <aside className="h-fit rounded-2xl bg-surface p-6 lg:sticky lg:top-8">
      <p className="type-eyebrow">Review</p>
      <h2 className="type-review-title mt-1">Your security system</h2>
      <p className="type-review-body mt-2">
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>
      <div className="mt-6 space-y-4">
        {sections.map((section) => (
          <ReviewSection
            key={section.category}
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
