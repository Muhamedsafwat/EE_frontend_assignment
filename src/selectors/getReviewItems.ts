import productsJson from "@/data/products.json";
import { useBuilderStore } from "@/store/builder.store";
import type { Product, Variant } from "@/types/data/Product.interface";

const products = productsJson as Product[];

export interface ReviewItem {
  product: Product;
  variant?: Variant;
  quantity: number;
}

export interface ReviewSection {
  title: string;
  items: ReviewItem[];
}

export function getReviewItems(): ReviewSection[] {
  const state = useBuilderStore();

  const items = state.selections.map((selection) => {
    const product = products.find((p) => p.id == selection.productId)!;
    const variant = product?.variants?.find((v) => v.id == selection.variantId);

    return {
      product,
      variant,
      quantity: selection.quantity,
    };
  });

  const reviewSections = items.reduce<Record<string, ReviewSection>>(
    (product, item) => {
      const category = item.product.category;
      if (!product[category]) {
        product[category] = {
          title: category,
          items: [item],
        };
      } else {
        product[category].items.push(item);
      }
      return product;
    },
    {},
  );

  return Object.values(reviewSections);
}
