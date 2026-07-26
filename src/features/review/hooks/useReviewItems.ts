import { useMemo } from "react";
import {
  CATEGORY_LABELS,
  REVIEW_CATEGORY_ORDER,
  SHIPPING_PRODUCT_ID,
} from "@/catalog/constants";
import type { ReviewGroup } from "../types/ReviewItem.interface";
import { useSelectedItems } from "./useSelectedItems";

/**
 * Selections grouped into review sections. Sections always render in
 * REVIEW_CATEGORY_ORDER, whatever order the products were chosen in, and empty
 * ones are dropped.
 */
export function useReviewItems(): ReviewGroup[] {
  const items = useSelectedItems();

  return useMemo(
    () =>
      REVIEW_CATEGORY_ORDER.flatMap((category) => {
        const groupItems = items.filter(
          (item) =>
            item.product.category === category &&
            item.product.id !== SHIPPING_PRODUCT_ID,
        );
        if (groupItems.length === 0) return [];

        return [{ category, title: CATEGORY_LABELS[category], items: groupItems }];
      }),
    [items],
  );
}
