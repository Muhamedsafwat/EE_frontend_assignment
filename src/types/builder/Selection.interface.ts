import { Product, Variant } from "../data/Product.interface";

/**
 * A single item the user has added to their system:
 * a product, the chosen variant (if any), and how many.
 */
export interface Selection {
  product: Product;
  variant?: Variant;
  quantity: number;
}
