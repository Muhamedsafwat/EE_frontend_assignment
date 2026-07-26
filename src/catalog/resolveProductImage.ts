import type { Product } from "@/types/Product.interface";

/**
 * The image to show for a product, optionally in a specific variant.
 *
 * Falls back from the requested variant, to the product's own image, to the
 * first variant — so a product that only carries images on its variants still
 * renders before one is picked.
 */
export function resolveProductImage(
  product: Product,
  variantId?: string,
): string | undefined {
  const variant = product.variants?.find((v) => v.id === variantId);
  return variant?.image ?? product.image ?? product.variants?.[0]?.image;
}
