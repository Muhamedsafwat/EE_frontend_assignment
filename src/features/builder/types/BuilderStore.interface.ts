import type { Selection } from "./Selection.interface";

export interface BuilderStore {
  currentStep: number;
  selections: Selection[];
  activeVariants: Record<string, string>;

  setCurrentStep: (step: number) => void;
  nextStep: () => void;

  setActiveVariant: (productId: string, variantId: string) => void;

  /** Plans are mutually exclusive and mandatory — this swaps, it never removes. */
  selectPlan: (productId: string) => void;

  incrementQuantity: (productId: string, variantId?: string) => void;
  decrementQuantity: (productId: string, variantId?: string) => void;

  /** Persists the order for the next visit. Returns whether it was stored. */
  saveSystem: () => boolean;
}
