import { getProduct, planIds } from "@/catalog";
import { readJson, writeJson } from "@/lib/storage";
import type { Selection } from "../types/Selection.interface";

const STORAGE_KEY = "wyze:builder:saved-system";

export function writeSavedSystem(selections: Selection[]): boolean {
  return writeJson(STORAGE_KEY, selections);
}

export function readSavedSystem(): Selection[] | undefined {
  const saved = readJson<Selection[]>(STORAGE_KEY);
  if (!Array.isArray(saved)) return undefined;

  const selections = saved.flatMap((value) => parseSelection(value) ?? []);

  return selections.some((s) => planIds.has(s.productId))
    ? selections
    : undefined;
}

function parseSelection(value: unknown): Selection | undefined {
  if (typeof value !== "object" || value === null) return undefined;

  const { productId, variantId, quantity } = value as Record<string, unknown>;
  if (typeof productId !== "string") return undefined;
  if (
    typeof quantity !== "number" ||
    !Number.isInteger(quantity) ||
    quantity < 1
  )
    return undefined;

  const product = getProduct(productId);
  if (!product) return undefined;

  const variants = product.variants ?? [];
  if (variants.length === 0)
    return variantId === undefined ? { productId, quantity } : undefined;

  if (typeof variantId !== "string") return undefined;

  return variants.some((v) => v.id === variantId)
    ? { productId, variantId, quantity }
    : undefined;
}
