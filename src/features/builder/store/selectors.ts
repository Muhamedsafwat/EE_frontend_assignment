import type { BuilderStep } from "@/types/Step.interface";
import type { BuilderStore } from "../types/BuilderStore.interface";
import type { Selection } from "../types/Selection.interface";

// Matches the one selection line for a product/variant pair. A product with no variant only matches lines that carry no variant.
export function matchesSelection(productId: string, variantId?: string) {
  return (selection: Selection) =>
    selection.productId === productId &&
    (variantId ? selection.variantId === variantId : !selection.variantId);
}

export const selectQuantity =
  (productId: string, variantId?: string) => (state: BuilderStore) =>
    state.selections.find(matchesSelection(productId, variantId))?.quantity ??
    0;

export const selectIsSelected = (productId: string) => (state: BuilderStore) =>
  state.selections.some((s) => s.productId === productId);

export const selectActiveVariant =
  (productId: string) => (state: BuilderStore) =>
    state.activeVariants[productId];

export const selectStepSelectionCount =
  (step: BuilderStep) => (state: BuilderStore) =>
    state.selections.filter((s) =>
      step.products.some((p) => p.id === s.productId),
    ).length;
