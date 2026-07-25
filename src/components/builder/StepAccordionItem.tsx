
//components
import Thumbnail from "@/components/ui/Thumbnail";
import { ChevronDownIcon } from "@/components/ui/icons";
import ProductGrid from "./ProductGrid";
// types
import type { BuilderStep } from "@/types/builder/BuilderStep.interface";
import { useBuilderStore } from "@/store/builder.store";

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
  const selections = useBuilderStore((s) => s.selections);

  const isOpen = index === currentStep;

  const selectedCount = selections
    .filter((s) => step.products.some((p) => p.id === s.productId)).length

  return (
    <div className={`border-b border-slate-200 last:border-b-0 transition-colors duration-300 px-5 py-2 ${isOpen ? "bg-surface/40" : ""}`}>
      <p className="text-xs font-medium uppercase tracking-wide text-muted border-b py-3">
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
        className="flex cursor-pointer items-center gap-3 py-4"
      >
        <Thumbnail src={step.icon} alt="" className="w-7 h-7 bg-transparent" />
        <div className="flex-1">
          
          <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
        </div>
        {selectedCount > 0 && (
          <span className="text-wyze-purple">
            {selectedCount} selected
          </span>
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
