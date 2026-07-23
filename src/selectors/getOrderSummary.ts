import productsJson from "@/data/products.json";
import type { Product } from "@/types/data/Product.interface";
import {
  getSelectedItems,
  shippingProductId,
  type ReviewItem,
} from "./getReviewItems";

const products = productsJson as Product[];

// shipping ships with every order, so it is read from the catalog instead of
// from the user's selections
const shippingProduct = products.find((p) => p.id === shippingProductId);

export interface OrderTotals {
  comparedAtTotal: number;
  total: number;
  monthly: number;
  savings: number;
}

export interface OrderSummaryData {
  plan?: ReviewItem;
  shipping?: ReviewItem;
  summary: OrderTotals;
}

export function getOrderSummary(): OrderSummaryData {
  const items = getSelectedItems();

  const plan = items.find((item) => item.product.category === "plans");
  const shipping = shippingProduct && { product: shippingProduct, quantity: 1 };

  // the plan is billed monthly and shipping is free, so neither one counts
  // towards the one off total
  const hardware = items.filter(
    (item) =>
      item.product.category !== "plans" &&
      item.product.id !== shippingProductId,
  );

  const total = hardware.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const comparedAtTotal = hardware.reduce(
    (sum, item) =>
      sum + (item.product.comparedAtPrice ?? item.product.price) * item.quantity,
    0,
  );

  return {
    plan,
    shipping,
    summary: {
      comparedAtTotal,
      total,
      monthly: plan?.product.price ?? 0,
      savings: comparedAtTotal - total,
    },
  };
}
