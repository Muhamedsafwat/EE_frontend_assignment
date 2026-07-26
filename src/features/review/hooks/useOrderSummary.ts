import { useMemo } from "react";
import { shippingProduct } from "@/catalog";
import { calculateTotals, type OrderTotals } from "@/catalog/pricing";
import type { ReviewItem } from "../types/ReviewItem.interface";
import { useSelectedItems } from "./useSelectedItems";

export interface OrderSummaryData {
  shipping?: ReviewItem;
  summary: OrderTotals;
}

// shipping ships with every order, so it is read from the catalog instead of
// from the user's selections — and is therefore constant
const shippingItem: ReviewItem | undefined = shippingProduct
  ? { product: shippingProduct, quantity: 1 }
  : undefined;

export function useOrderSummary(): OrderSummaryData {
  const items = useSelectedItems();
  const summary = useMemo(() => calculateTotals(items), [items]);

  return { shipping: shippingItem, summary };
}
