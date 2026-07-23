import productsJson from "@/data/products.json";
import { useBuilderStore } from "@/store/builder.store";
import type { Product, Variant } from "@/types/data/Product.interface";

const products = productsJson as Product[];

// review sections always render in this order, whatever order they were selected in
const categoryOrder = ["cameras", "sensors", "accessories", "plans"];

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
export function getSelectedItems(): ReviewItem[] {
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

export function getReviewItems(): ReviewSection[] {
  const items = getSelectedItems().filter(
    (item) => item.product.id !== shippingProductId,
  );

  return categoryOrder.flatMap((category) => {
    const sectionItems = items.filter((i) => i.product.category === category);
    if (sectionItems.length === 0) return [];

    return [{ title: category, items: sectionItems }];
  });
}
