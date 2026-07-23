import { Selection } from "./Selection.interface";

export interface BuilderStore {
  currentStep: number;
  selections: Selection[];
  activeVariants: Record<string, string>;

  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;

  setActiveVariant: (productId: string, variantId: string) => void;

  selectPlan: (productId: string) => void;

  incrementQuantity: (productId: string, variantId?: string) => void;
  decrementQuantity: (productId: string, variantId?: string) => void;
}
