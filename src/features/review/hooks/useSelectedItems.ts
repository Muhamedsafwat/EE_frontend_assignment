import { useMemo } from "react";
import { getProduct } from "@/catalog";
import { useBuilderStore } from "@/features/builder/store/builder.store";
import type { ReviewItem } from "../types/ReviewItem.interface";

/**
 * Every selection with its product and variant resolved from the catalog.
 *
 * A selection whose product is no longer in the catalog is dropped rather than
 * passed on half-resolved — every consumer reads `item.product`, so letting an
 * unresolved one through would take the whole panel down.
 */
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
