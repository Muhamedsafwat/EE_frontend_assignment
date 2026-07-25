import type { Product } from "@/types/data/Product.interface";
import Thumbnail from "@/components/ui/Thumbnail";
import PriceTag from "@/components/ui/PriceTag";
import SavingsBadge from "@/components/ui/SavingsBadge";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { getSavingsPercent } from "@/lib/formatCurrency";
import VariantSelector from "./VariantSelector";
import { useBuilderStore } from "@/store/builder.store";
import ItemSelector from "../ui/ItemSelector";



function ProductCard({product}: { product: Product }) {
  
  const savings = product.comparedAtPrice
    ? getSavingsPercent(product.comparedAtPrice, product.price)
    : 0;

  const {activeVariants} = useBuilderStore();
  const activeVaraint = activeVariants[product.id];
  const image = product.variants?.find(variant => variant.id === activeVaraint)?.image ?? product.image;

  return (
    <div className="relative flex items-center rounded-xl border border-slate-200 bg-white p-4">
      {/* image and badge */}
      <div>
      {savings > 0 && <SavingsBadge percent={savings} />}

        <Thumbnail src={image} alt={product.name} className="h-24 w-24" />
      </div>
    <div>
        <div className="flex flex-1 flex-col gap-1">
          <h4 className="font-semibold text-ink">{product.name}</h4>
          <p className="text-sm text-ink-muted">{product.description} <a href="#" className="text-sm font-medium text-wyze-purple hover:underline">
            Learn More
          </a></p>
        </div>
      

      {product.variants && (
        <div className="mt-3">
          <VariantSelector variants={product.variants} productId={product.id} />
        </div>
      )}

      <div className="mt-4 flex items-end justify-between">
        {product.category == "plans" ? <ItemSelector productId={product.id} /> : <QuantityStepper productId={product.id} variantId={activeVaraint} />} 
        
        <PriceTag
          price={product.price}
          comparedAtPrice={product.comparedAtPrice}
          variant="builder"
        />
      </div>
      </div>
    </div>
  );
}

export default ProductCard;
