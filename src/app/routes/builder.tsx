import type { Product } from "@/types/data/Product.interface"
import type { Step } from "@/types/data/Step.interface"
import products from "@/data/products.json"
import steps from "@/data/steps.json"
import { getBuilderSteps } from "@/lib/getBuilderSteps"

function Builder() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <button className="text-black" onClick={() => console.log(getBuilderSteps(steps as Step[], products as Product[]))}>test</button>
    </div>
  )
}

export default Builder
