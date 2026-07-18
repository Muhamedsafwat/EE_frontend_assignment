import { BuilderStep } from "@/types/builder/BuilderStep.interface";
import { Product } from "@/types/data/Product.interface";
import { Step } from "@/types/data/Step.interface";

export function getBuilderSteps(
  steps: Step[],
  products: Product[],
): BuilderStep[] {
  const builderSteps = steps.map((step) => ({
    ...step,
    products: products.filter(
      (product) => product.category === step.productCategory,
    ),
  }));
  return builderSteps;
}
