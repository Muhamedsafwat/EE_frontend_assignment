import type { Product } from "@/types/Product.interface";

type Category = Product["category"];

/**
 * Shipping is added to every order automatically rather than being picked, so it
 * is excluded from the builder grid and gets its own row in the order summary.
 */
export const SHIPPING_PRODUCT_ID = "fast-shipping";

/**
 * Order the review panel groups its sections in, independent of the wizard's
 * step order — the plan is listed last there even though it is chosen third.
 */
export const REVIEW_CATEGORY_ORDER: Category[] = [
  "cameras",
  "sensors",
  "accessories",
  "plans",
];

/** Display labels for category slugs, used for review section headings. */
export const CATEGORY_LABELS: Record<Category, string> = {
  cameras: "Cameras",
  sensors: "Sensors",
  accessories: "Accessories",
  plans: "Plans",
};
