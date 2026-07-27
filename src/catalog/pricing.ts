import type { Product } from "@/types/Product.interface";
import { SHIPPING_PRODUCT_ID } from "./constants";

export interface PricedItem {
  product: Product;
  quantity: number;
}

export interface OrderTotals {
  comparedAtTotal: number;
  total: number;
  monthly: number;
  savings: number;
}

// Discount percentage between a compared-at price and the current price.
export function getSavingsPercent(
  comparedAtPrice: number,
  price: number,
): number {
  if (comparedAtPrice <= 0) return 0;
  return Math.floor((1 - price / comparedAtPrice) * 100);
}

export function lineTotal({ product, quantity }: PricedItem): number {
  return product.price * quantity;
}

export function lineComparedAtTotal({ product, quantity }: PricedItem): number {
  return (product.comparedAtPrice ?? product.price) * quantity;
}

export function isBilledUpfront(product: Product): boolean {
  return product.category !== "plans" && product.id !== SHIPPING_PRODUCT_ID;
}

export function calculateTotals(items: PricedItem[]): OrderTotals {
  const upfront = items.filter((item) => isBilledUpfront(item.product));

  const total = upfront.reduce((sum, item) => sum + lineTotal(item), 0);
  const comparedAtTotal = upfront.reduce(
    (sum, item) => sum + lineComparedAtTotal(item),
    0,
  );

  const plan = items.find((item) => item.product.category === "plans");

  return {
    comparedAtTotal,
    total,
    monthly: plan?.product.price ?? 0,
    savings: comparedAtTotal - total,
  };
}
