import ReviewSection from "./ReviewSection";
//import OrderSummary from "./OrderSummary";


import { getReviewItems } from "@/selectors/getReviewItems";


function ReviewPanel() {


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

      <button
      onClick={() => console.log(getReviewItems())}
      className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-900 bg-white mt-6">
        Log review items
      </button>

       <div className="mt-6 space-y-4">
        {getReviewItems().map((section) => (
          <ReviewSection
            key={section.title}
            title={section.title}
            items={section.items}
          />
        ))}
        {/* <OrderSummary
          plan={reviewPlan}
          shipping={reviewShipping}
          summary={reviewSummary}
        /> */}
      </div>
    </aside>
  );
}

export default ReviewPanel;
