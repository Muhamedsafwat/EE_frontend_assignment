import productsJson from "@/data/products.json";
import { useBuilderStore } from "@/store/builder.store";
import type { Product, Variant } from "@/types/data/Product.interface";

const products = productsJson as Product[];

// shipping gets its own row in the order summary, so it is kept out of the sections
export const shippingProductId = "fast-shipping";

export interface ReviewItem {
  product: Product;
  variant?: Variant;
  quantity: number;
}

export interface ReviewSection {
  title: string;
  items: ReviewItem[];
}

/** Every selection with its product and variant resolved from the catalog. */
export function useSelectedItems(): ReviewItem[] {
  const selections = useBuilderStore((state) => state.selections);

  return selections.map((selection) => {
    const product = products.find((p) => p.id == selection.productId)!;
    const variant = product?.variants?.find((v) => v.id == selection.variantId);

    return {
      product,
      variant,
      quantity: selection.quantity,
    };
  });
}

export function useReviewItems(): ReviewSection[] {
  const items = useSelectedItems().filter(
    (item) => item.product.id !== shippingProductId,
  );

  // review sections always render in this order, whatever order they were selected in
  const categoryOrder = ["cameras", "sensors", "accessories", "plans"];

  return categoryOrder.flatMap((category) => {
    const sectionItems = items.filter((i) => i.product.category === category);
    if (sectionItems.length === 0) return [];

    return [{ title: category, items: sectionItems }];
  });
}

/** Returns only the plan selection, if any. */
export function useSelectedPlan(): ReviewItem | undefined {
  const items = useSelectedItems();
  return items.find((item) => item.product.category === "plans");
}
