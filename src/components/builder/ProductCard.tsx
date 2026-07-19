import type { Product } from "@/types/data/Product.interface";
import Thumbnail from "@/components/ui/Thumbnail";
import PriceTag from "@/components/ui/PriceTag";
import SavingsBadge from "@/components/ui/SavingsBadge";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { getSavingsPercent } from "@/lib/formatCurrency";
import VariantSelector from "./VariantSelector";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const image = product.image ?? product.variants?.[0]?.image;
  const savings = product.comparedAtPrice
    ? getSavingsPercent(product.comparedAtPrice, product.price)
    : 0;

  return (
    <div className="relative flex flex-col rounded-xl border border-slate-200 bg-white p-4">
      {savings > 0 && <SavingsBadge percent={savings} />}

      <div className="flex gap-4">
        <Thumbnail src={image} alt={product.name} className="h-24 w-24" />

        <div className="flex flex-1 flex-col gap-1">
          <h4 className="font-semibold text-slate-900">{product.name}</h4>
          <p className="text-sm text-slate-500">{product.description}</p>
          <a href="#" className="text-sm font-medium text-indigo-600 hover:underline">
            Learn More
          </a>
        </div>
      </div>

      {product.variants && (
        <div className="mt-3">
          <VariantSelector variants={product.variants} />
        </div>
      )}

      <div className="mt-4 flex items-end justify-between">
        <QuantityStepper value={0} />
        <PriceTag
          price={product.price}
          comparedAtPrice={product.comparedAtPrice}
          variant="builder"
        />
      </div>
    </div>
  );
}

export default ProductCard;
