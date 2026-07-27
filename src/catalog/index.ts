import type { Product } from "@/types/Product.interface";
import type { BuilderStep, Step } from "@/types/Step.interface";
import { SHIPPING_PRODUCT_ID } from "./constants";
import productsJson from "./products.json";
import stepsJson from "./steps.json";

export const products = productsJson as Product[];
export const steps = stepsJson as Step[];

const productsById = new Map(products.map((product) => [product.id, product]));

export function getProduct(id: string): Product | undefined {
  return productsById.get(id);
}

export const planIds = new Set(
  products.filter((p) => p.category === "plans").map((p) => p.id),
);

export const requiredIds = new Set(
  products.filter((p) => p.isRequired).map((p) => p.id),
);

export const shippingProduct = getProduct(SHIPPING_PRODUCT_ID);

export const selectableProducts = products.filter(
  (p) => p.id !== SHIPPING_PRODUCT_ID,
);

export const builderSteps: BuilderStep[] = steps.map((step) => ({
  ...step,
  products: selectableProducts.filter(
    (product) => product.category === step.productCategory,
  ),
}));

export const defaultVariantByProduct: Record<string, string> =
  Object.fromEntries(
    products
      .filter((p) => p.variants && p.variants.length > 0)
      .map((p) => [p.id, p.variants![0].id]),
  );
