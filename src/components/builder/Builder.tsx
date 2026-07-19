import type { BuilderStep } from "@/types/builder/BuilderStep.interface";
import StepAccordionItem from "./StepAccordionItem";

interface BuilderProps {
  steps: BuilderStep[];
}

/**
 * Left panel: an accordion of build steps, each listing the products
 * available for that step's category.
 */
function Builder({ steps }: BuilderProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {steps.map((step, index) => (
        <StepAccordionItem
          key={step.id}
          step={step}
          index={index}
          total={steps.length}
          nextStepTitle={steps[index + 1]?.title}
          defaultOpen={index === 0}
        />
      ))}
    </section>
  );
}

export default Builder;
