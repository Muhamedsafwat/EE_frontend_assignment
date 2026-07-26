import { builderSteps } from "@/catalog";
import Builder from "@/features/builder/components/Builder";
import ReviewPanel from "@/features/review/components/ReviewPanel";

function BuilderPage() {
  return (
    <main className="min-h-screen py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 lg:grid-cols-[1fr_360px]">
        <Builder steps={builderSteps} />
        <ReviewPanel />
      </div>
    </main>
  );
}

export default BuilderPage;
