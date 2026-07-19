import type { Selection } from "@/types/builder/Selection.interface";
import ReviewLineItem from "./ReviewLineItem";

interface ReviewSectionProps {
  title: string;
  items: Selection[];
}

function ReviewSection({ title, items }: ReviewSectionProps) {
  return (
    <div className="border-t border-indigo-100 pt-3">
      <h3 className="text-xs font-medium uppercase tracking-wide text-muted">
        {title}
      </h3>
      <ul>
        {items.map((selection) => (
          <ReviewLineItem key={selection.product.id} selection={selection} />
        ))}
      </ul>
    </div>
  );
}

export default ReviewSection;
