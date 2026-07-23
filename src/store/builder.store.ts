import { create } from "zustand";
// import types
import type { BuilderStore } from "@/types/builder/BuilderStore.interface";
import type { Selection } from "@/types/builder/Selection.interface";
import products from "@/data/products.json";

// plan products are mutually exclusive, only one can be selected at a time
const planIds = new Set(
  products.filter((p) => p.category === "plans").map((p) => p.id),
);

// required products can never be removed, their quantity floors at 1
const requiredIds = new Set(
  products.filter((p) => p.isRequired).map((p) => p.id),
);

// required products ship in the cart at quantity 1 from the start, defaulting
// to their first variant so the count matches the stepper's active variant
const requiredSelections: Selection[] = products
  .filter((p) => p.isRequired)
  .map((p) => ({
    productId: p.id,
    variantId: p.variants?.[0]?.id,
    quantity: 1,
  }));

// initial state
const initialState = {
  currentStep: 0,
  selections: requiredSelections,
  activeVariants: Object.fromEntries(
    products
      .filter((p) => p.variants && p.variants.length > 0)
      .map((p) => [p.id, p.variants![0].id]),
  ),
};

// the actual store
export const useBuilderStore = create<BuilderStore>((set) => ({
  ...initialState,

  setCurrentStep: (step) => set({ currentStep: step }),

  nextStep: () =>
    set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) })),

  previousStep: () =>
    set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),

  setActiveVariant: (productId, variantId) =>
    set((state) => ({
      activeVariants: { ...state.activeVariants, [productId]: variantId },
    })),

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
}));

// change quantity helper function
function changeQuantity(
  selections: Selection[],
  productId: string,
  variantId: string | undefined,
  change: number,
): Selection[] {
  const matches = (s: Selection) =>
    s.productId === productId && (!variantId ? !s.variantId : s.variantId === variantId);

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
