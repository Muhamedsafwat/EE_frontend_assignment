import type { Selection } from "../types/Selection.interface";

/**
 * The order the builder starts from. Includes a plan, which the app relies on:
 * a plan is mandatory and can only be swapped, never removed.
 */
export const seededSelections: Selection[] = [
  {
    productId: "cam-v4",
    variantId: "white",
    quantity: 1,
  },
  {
    productId: "cam-pan-v3",
    variantId: "white",
    quantity: 1,
  },
  {
    productId: "motion-sensor",
    quantity: 2,
  },
  {
    productId: "sense-hub",
    quantity: 1,
  },
  {
    productId: "micro-sd",
    quantity: 2,
  },
  {
    productId: "cam-unlimited",
    quantity: 1,
  },
];
