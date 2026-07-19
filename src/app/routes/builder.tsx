import type { Product } from "@/types/data/Product.interface"
import type { Step } from "@/types/data/Step.interface"
import products from "@/data/products.json"
import steps from "@/data/steps.json"
import { getBuilderSteps } from "@/lib/getBuilderSteps"
import Builder from "@/components/builder/Builder"
import ReviewPanel from "@/components/review/ReviewPanel"

function BuilderPage() {
  const builderSteps = getBuilderSteps(steps as Step[], products as Product[])

  return (
    <main className="min-h-screen py-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 lg:grid-cols-[1fr_360px]">
        <Builder steps={builderSteps} />
        <ReviewPanel />
      </div>
    </main>
  )
}

export default BuilderPage
