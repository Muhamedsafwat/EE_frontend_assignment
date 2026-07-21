import type { ReviewItem } from "@/selectors/getReviewItems";
import ReviewLineItem from "./ReviewLineItem";

interface ReviewSectionProps {
  title: string;
  items: ReviewItem[];
}

function ReviewSection({ title, items }: ReviewSectionProps) {

  console.log(items)
  return (
    <div className="border-t border-indigo-100 pt-3">
      <h3 className="text-xs font-medium uppercase tracking-wide text-muted">
        {title}
      </h3>
      <ul>
        {items.map((item) => (
          <ReviewLineItem
            key={`${item.product.id}-${item.variant?.id}`}
            item={item}
          />
        ))}
      </ul>
    </div>
  );
}

export default ReviewSection;
