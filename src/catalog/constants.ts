import type { Product } from "@/types/Product.interface";

type Category = Product["category"];

export const SHIPPING_PRODUCT_ID = "fast-shipping";

export const REVIEW_CATEGORY_ORDER: Category[] = [
  "cameras",
  "sensors",
  "accessories",
  "plans",
];

export const CATEGORY_LABELS: Record<Category, string> = {
  cameras: "Cameras",
  sensors: "Sensors",
  accessories: "Accessories",
  plans: "Plans",
};
