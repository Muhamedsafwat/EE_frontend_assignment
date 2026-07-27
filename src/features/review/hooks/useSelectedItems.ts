import { useMemo } from "react";
import { getProduct } from "@/catalog";
import { useBuilderStore } from "@/features/builder/store/builder.store";
import type { ReviewItem } from "../types/ReviewItem.interface";

export function useSelectedItems(): ReviewItem[] {
  const selections = useBuilderStore((state) => state.selections);

  return useMemo(
    () =>
      selections.flatMap((selection) => {
        const product = getProduct(selection.productId);
        if (!product) return [];

        return [
          {
            product,
            variant: product.variants?.find(
              (v) => v.id === selection.variantId,
            ),
            quantity: selection.quantity,
          },
        ];
      }),
    [selections],
  );
}
