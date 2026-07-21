
//components
import Thumbnail from "@/components/ui/Thumbnail";
import { ChevronDownIcon } from "@/components/ui/icons";
import ProductGrid from "./ProductGrid";
// types
import type { BuilderStep } from "@/types/builder/BuilderStep.interface";
interface StepAccordionItemProps {
  step: BuilderStep;
  index: number;
  total: number;
  //Title of the following step, used for the "Next" call to action.
  nextStepTitle?: string;
  defaultOpen?: boolean;
}

function StepAccordionItem({
  step,
  index,
  total,
  nextStepTitle,
  defaultOpen = false,
}: StepAccordionItemProps) {


  return (
    <details
      open={defaultOpen}
      className="group border-b border-slate-200 last:border-b-0 open:bg-surface/40"
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
        <Thumbnail src={step.icon} alt="" className="h-9 w-9 bg-transparent" />
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Step {index + 1} of {total}
          </p>
          <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
        </div>
        <ChevronDownIcon className="h-5 w-5 text-icon transition-transform group-open:rotate-180" />
      </summary>

      <div className="px-5 pb-6">
        <ProductGrid products={step.products} />

        {nextStepTitle && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className="rounded-lg border border-wyze-purple px-5 py-2.5 text-sm font-semibold text-wyze-purple hover:bg-surface"
            >
              Next: {nextStepTitle}
            </button>
          </div>
        )}
      </div>
    </details>
  );
}

export default StepAccordionItem;
