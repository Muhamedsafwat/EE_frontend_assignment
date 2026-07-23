import type { Product } from "@/types/data/Product.interface"
import type { Step } from "@/types/data/Step.interface"
import products from "@/data/products.json"
import steps from "@/data/steps.json"
import { getBuilderSteps } from "@/lib/getBuilderSteps"
import Builder from "@/components/builder/Builder"
import ReviewPanel from "@/components/review/ReviewPanel"
import { shippingProductId } from "@/selectors/getReviewItems"

function BuilderPage() {
  // shipping is added to every order by the review panel, it is not something
  // the user picks out of the accessories step
  const builderSteps = getBuilderSteps(
    steps as Step[],
    (products as Product[]).filter((p) => p.id !== shippingProductId),
  )

  return (
    <main className="min-h-screen py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 lg:grid-cols-[1fr_360px]">
        <Builder steps={builderSteps} />
        <ReviewPanel />
      </div>
    </main>
  )
}

export default BuilderPage
