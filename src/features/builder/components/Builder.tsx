import type { BuilderStep } from "@/types/Step.interface";
import StepAccordionItem from "./StepAccordionItem";

interface BuilderProps {
  steps: BuilderStep[];
}

function Builder({ steps }: BuilderProps) {
  return (
    <section className="overflow-hidden rounded-2xl h-fit sticky top-3">
      {steps.map((step, index) => (
        <StepAccordionItem
          key={step.id}
          step={step}
          index={index}
          total={steps.length}
          nextStepTitle={steps[index + 1]?.title}
        />
      ))}
    </section>
  );
}

export default Builder;
