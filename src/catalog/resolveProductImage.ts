import type { Product } from "@/types/Product.interface";

//The image to show for a product (image, variant, fallback).
export function resolveProductImage(
  product: Product,
  variantId?: string,
): string | undefined {
  const variant = product.variants?.find((v) => v.id === variantId);
  return variant?.image ?? product.image ?? product.variants?.[0]?.image;
}
