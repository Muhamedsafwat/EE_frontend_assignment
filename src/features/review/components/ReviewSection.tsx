import type { ReviewItem } from "../types/ReviewItem.interface";
import ReviewLineItem from "./ReviewLineItem";

interface ReviewSectionProps {
  title: string;
  items: ReviewItem[];
}

function ReviewSection({ title, items }: ReviewSectionProps) {
  return (
    <div className="border-t border-indigo-100 pt-3">
      <h3 className="type-category-title">{title}</h3>
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
