import products from "./products.json";
import type { Product } from "@/types/data/Product.interface";
import { Selection } from "@/types/builder/Selection.interface";

/**
 * Static, mocked review data. The review panel is presentational only, so
 * these selections stand in for whatever the builder would produce once
 * selection logic exists.
 */
const catalog = products as Product[];

function select(id: string, quantity: number, variantId?: string): Selection {
  const product = catalog.find((item) => item.id === id);
  if (!product) throw new Error(`Unknown product in mock selection: ${id}`);
  const variant = product.variants?.find((v) => v.id === variantId);
  return { productId: id, variantId: variant?.id ?? "", quantity };
}

export interface ReviewSectionData {
  title: string;
  items: Selection[];
}

export const reviewSections: ReviewSectionData[] = [
  {
    title: "Cameras",
    items: [select("cam-v4", 1, "black"), select("cam-pan-v3", 2, "white")],
  },
  {
    title: "Sensors",
    items: [select("motion-sensor", 2), select("sense-hub", 1)],
  },
  {
    title: "Accessories",
    items: [select("micro-sd", 2)],
  },
];

export const reviewPlan = select("cam-unlimited", 1);
export const reviewShipping = select("fast-shipping", 1);

export const reviewSummary = {
  comparedAtTotal: 238.81,
  total: 187.89,
  monthly: 19.19,
  savings: 50.92,
};
