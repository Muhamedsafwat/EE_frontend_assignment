import Thumbnail from "@/components/ui/Thumbnail";
import { ChevronDownIcon } from "@/components/ui/icons";
import type { BuilderStep } from "@/types/Step.interface";
import { useBuilderStore } from "../store/builder.store";
import { selectStepSelectionCount } from "../store/selectors";
import ProductGrid from "./ProductGrid";

interface StepAccordionItemProps {
  step: BuilderStep;
  index: number;
  total: number;
  nextStepTitle?: string;
}

function StepAccordionItem({
  step,
  index,
  total,
  nextStepTitle,
}: StepAccordionItemProps) {
  const currentStep = useBuilderStore((s) => s.currentStep);
  const setCurrentStep = useBuilderStore((s) => s.setCurrentStep);
  const nextStep = useBuilderStore((s) => s.nextStep);
  const selectedCount = useBuilderStore(selectStepSelectionCount(step));

  const isOpen = index === currentStep;

  return (
    <div
      className={`transition-colors duration-300 px-5 py-2 rounded-lg ${isOpen ? "bg-surface" : ""}`}
    >
      <p className="type-eyebrow uppercase py-3">
        Step {index + 1} of {total}
      </p>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setCurrentStep(index)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setCurrentStep(index);
          }
        }}
        className={`flex cursor-pointer items-center gap-3 py-4 border-y border-slate-500 ${isOpen && "border-b-transparent"}`}
      >
        <Thumbnail src={step.icon} alt="" className="w-7 h-7 bg-transparent" />
        <div className="flex-1">
          <h3 className="type-step-title">{step.title}</h3>
        </div>
        {selectedCount > 0 && (
          <span className="type-step-selected">{selectedCount} selected</span>
        )}
        <ChevronDownIcon
          className={`h-5 w-5 text-icon transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      <div className="accordion-content" data-open={String(isOpen)}>
        <div>
          <div className="pb-6">
            <ProductGrid products={step.products} />

            {nextStepTitle && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextStep();
                  }}
                  className="rounded-lg border border-wyze-purple px-5 py-2.5 text-sm font-semibold text-wyze-purple hover:bg-surface"
                >
                  Next: {nextStepTitle}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepAccordionItem;
