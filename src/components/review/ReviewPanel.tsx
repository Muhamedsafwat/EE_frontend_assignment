import {
  reviewSections,
  reviewPlan,
  reviewShipping,
  reviewSummary,
} from "@/data/reviewSelection";
import ReviewSection from "./ReviewSection";
import OrderSummary from "./OrderSummary";

/**
 * Right panel: a read-only summary of the selected items and pricing.
 * Driven by mocked data — no selection logic lives here.
 */
function ReviewPanel() {
  return (
    <aside className="h-fit rounded-2xl bg-indigo-50 p-6 lg:sticky lg:top-8">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        Review
      </p>
      <h2 className="mt-1 text-2xl font-bold text-slate-900">
        Your security system
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>

      <div className="mt-6 space-y-4">
        {reviewSections.map((section) => (
          <ReviewSection
            key={section.title}
            title={section.title}
            items={section.items}
          />
        ))}
        <OrderSummary
          plan={reviewPlan}
          shipping={reviewShipping}
          summary={reviewSummary}
        />
      </div>
    </aside>
  );
}

export default ReviewPanel;
