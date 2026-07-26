import type { Product } from "@/types/Product.interface";
import type { BuilderStep, Step } from "@/types/Step.interface";
import { SHIPPING_PRODUCT_ID } from "./constants";
import productsJson from "./products.json";
import stepsJson from "./steps.json";

/**
 * The catalog is the single owner of the static product data. Nothing else
 * should import the JSON directly — every lookup, index and derived set the app
 * needs is built here, once, at module load.
 *
 * This module is deliberately React-free so the rules it holds stay testable.
 */
export const products = productsJson as Product[];
export const steps = stepsJson as Step[];

/** Product lookup by id. Replaces scanning the array on every render. */
const productsById = new Map(products.map((product) => [product.id, product]));

/** Resolves a product id, or `undefined` if the id is not in the catalog. */
export function getProduct(id: string): Product | undefined {
  return productsById.get(id);
}

/** Plans are mutually exclusive — only one may be selected at a time. */
export const planIds = new Set(
  products.filter((p) => p.category === "plans").map((p) => p.id),
);

/** Required products can never be removed; their quantity floors at 1. */
export const requiredIds = new Set(
  products.filter((p) => p.isRequired).map((p) => p.id),
);

/** Ships with every order, so it is read from here rather than from selections. */
export const shippingProduct = getProduct(SHIPPING_PRODUCT_ID);

/** Everything the builder offers the user, i.e. the catalog minus shipping. */
export const selectableProducts = products.filter(
  (p) => p.id !== SHIPPING_PRODUCT_ID,
);

/** The wizard's steps with their products attached. Static, so computed once. */
export const builderSteps: BuilderStep[] = steps.map((step) => ({
  ...step,
  products: selectableProducts.filter(
    (product) => product.category === step.productCategory,
  ),
}));

/** First variant of every product that has variants, used to seed the store. */
export const defaultVariantByProduct: Record<string, string> =
  Object.fromEntries(
    products
      .filter((p) => p.variants && p.variants.length > 0)
      .map((p) => [p.id, p.variants![0].id]),
  );
