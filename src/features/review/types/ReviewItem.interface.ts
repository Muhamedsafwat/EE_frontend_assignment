import type { Product, Variant } from "@/types/Product.interface";

/** A selection with its product and variant resolved from the catalog. */
export interface ReviewItem {
  product: Product;
  variant?: Variant;
  quantity: number;
}

/** Review items grouped under one category heading. */
export interface ReviewGroup {
  category: Product["category"];
  title: string;
  items: ReviewItem[];
}
