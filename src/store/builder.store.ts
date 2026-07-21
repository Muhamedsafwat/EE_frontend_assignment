import { create } from "zustand";
// import types
import type { BuilderStore } from "@/types/builder/BuilderStore.interface";
import type { Selection } from "@/types/builder/Selection.interface";
import products from "@/data/products.json";

// initial state
const initialState = {
  currentStep: 0,
  selections: [],
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
  variantId: string,
  change: number,
): Selection[] {
  const matches = (s: Selection) =>
    s.productId === productId && s.variantId === variantId;

  const existing = selections.find(matches);
  const nextQuantity = (existing?.quantity ?? 0) + change;

  if (nextQuantity <= 0) return selections.filter((s) => !matches(s));
  if (!existing)
    return [...selections, { productId, variantId, quantity: nextQuantity }];

  return selections.map((s) =>
    matches(s) ? { ...s, quantity: nextQuantity } : s,
  );
}
