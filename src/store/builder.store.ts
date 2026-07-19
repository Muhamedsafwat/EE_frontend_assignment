import { create } from "zustand";
// types
import type { BuilderStore } from "@/types/builder/BuilderStore.interface";

const initialState = {
  currentStep: 0,
  selections: [],
  activeVariants: {},
};

export const useBuilderStore = create<BuilderStore>((set) => ({
  ...initialState,

  setCurrentStep: (step) => set({ currentStep: step }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 3),
    })),

  previousStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),

  setActiveVariant: (productId, variantId) =>
    set((state) => ({
      activeVariants: {
        ...state.activeVariants,
        [productId]: variantId,
      },
    })),

  incrementQuantity: (productId, variantId) =>
    set((state) => {
      const existing = state.selections.find(
        (s) => s.productId === productId && s.variantId === variantId,
      );

      if (!existing) {
        return {
          selections: [
            ...state.selections,
            {
              productId,
              variantId,
              quantity: 1,
            },
          ],
        };
      }

      return {
        selections: state.selections.map((selection) =>
          selection.productId === productId && selection.variantId === variantId
            ? {
                ...selection,
                quantity: selection.quantity + 1,
              }
            : selection,
        ),
      };
    }),

  decrementQuantity: (productId, variantId) =>
    set((state) => {
      const existing = state.selections.find(
        (s) => s.productId === productId && s.variantId === variantId,
      );

      if (!existing) return state;

      if (existing.quantity === 1) {
        return {
          selections: state.selections.filter(
            (selection) =>
              !(
                selection.productId === productId &&
                selection.variantId === variantId
              ),
          ),
        };
      }

      return {
        selections: state.selections.map((selection) =>
          selection.productId === productId && selection.variantId === variantId
            ? {
                ...selection,
                quantity: selection.quantity - 1,
              }
            : selection,
        ),
      };
    }),
}));
