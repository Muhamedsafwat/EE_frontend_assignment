import { create } from "zustand";
import { builderSteps, defaultVariantByProduct, planIds, requiredIds } from "@/catalog";
import type { BuilderStore } from "../types/BuilderStore.interface";
import type { Selection } from "../types/Selection.interface";
import { seededSelections } from "./seededSelections";
import { matchesSelection } from "./selectors";

// derived from the step list rather than hardcoded, so adding a step to
// steps.json keeps the wizard walkable to the end
const lastStepIndex = Math.max(builderSteps.length - 1, 0);

const initialState = {
  currentStep: 0,
  selections: seededSelections,
  activeVariants: { ...defaultVariantByProduct },
};

export const useBuilderStore = create<BuilderStore>((set) => ({
  ...initialState,

  setCurrentStep: (step) =>
    set({ currentStep: Math.min(Math.max(step, 0), lastStepIndex) }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, lastStepIndex),
    })),

  setActiveVariant: (productId, variantId) =>
    set((state) => ({
      activeVariants: { ...state.activeVariants, [productId]: variantId },
    })),

  // a plan is mandatory, so this swaps the current one out rather than toggling
  selectPlan: (productId) =>
    set((state) => ({
      selections: [
        ...state.selections.filter((s) => !planIds.has(s.productId)),
        { productId, quantity: 1 },
      ],
    })),

  incrementQuantity: (productId, variantId) =>
    set((state) => ({
      selections: changeQuantity(state.selections, productId, variantId, 1),
    })),

  decrementQuantity: (productId, variantId) =>
    set((state) => ({
      selections: changeQuantity(state.selections, productId, variantId, -1),
    })),

  reset: () => set(initialState),
}));

/**
 * Applies a quantity delta to one selection line.
 *
 * Lines are keyed by product *and* variant, so picking a different colour of a
 * product already in the order adds a separate line rather than reusing it.
 */
function changeQuantity(
  selections: Selection[],
  productId: string,
  variantId: string | undefined,
  change: number,
): Selection[] {
  const matches = matchesSelection(productId, variantId);

  const existing = selections.find(matches);
  const nextQuantity = (existing?.quantity ?? 0) + change;

  // below 1, required products hold at their current quantity, everything
  // else drops out of the selections
  if (nextQuantity < 1)
    return requiredIds.has(productId)
      ? selections
      : selections.filter((s) => !matches(s));

  if (!existing)
    return [...selections, { productId, variantId, quantity: nextQuantity }];

  return selections.map((s) =>
    matches(s) ? { ...s, quantity: nextQuantity } : s,
  );
}
