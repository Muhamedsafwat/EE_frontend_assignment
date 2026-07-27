import Thumbnail from "@/components/ui/Thumbnail";
import PriceTag from "@/components/ui/PriceTag";
import SavingsBadge from "@/components/ui/SavingsBadge";
import { getSavingsPercent } from "@/catalog/pricing";
import { resolveProductImage } from "@/catalog/resolveProductImage";
import type { Product } from "@/types/Product.interface";
import { useBuilderStore } from "../store/builder.store";
import { selectActiveVariant, selectIsSelected } from "../store/selectors";
import ItemSelector from "./ItemSelector";
import QuantityStepper from "./QuantityStepper";
import VariantSelector from "./VariantSelector";

function ProductCard({ product }: { product: Product }) {
  const savings = product.comparedAtPrice
    ? getSavingsPercent(product.comparedAtPrice, product.price)
    : 0;

  const activeVariant = useBuilderStore(selectActiveVariant(product.id));
  const isSelected = useBuilderStore(selectIsSelected(product.id));
  const image = resolveProductImage(product, activeVariant);

  return (
    <div
      className={`relative flex items-center rounded-xl bg-white border-2 p-4 duration-200 ${
        isSelected ? "border-wyze-purple ": "border-white"
      }`}
    >
      {/* image and badge */}
      <div>
        {savings > 0 && <SavingsBadge percent={savings} />}
        <Thumbnail src={image} alt={product.name} className="h-24 w-24" />
      </div>

      <div>
        <div className="flex flex-1 flex-col gap-1">
          <h4 className="type-product-title">{product.name}</h4>
          <p className="type-product-desc">
            {product.description}{" "}
            <a href="#" className="type-inline-link">
              Learn More
            </a>
          </p>
        </div>

        {product.variants && (
          <div className="mt-3">
            <VariantSelector
              variants={product.variants}
              productId={product.id}
            />
          </div>
        )}

        <div className="mt-4 flex items-end justify-between">
          {product.category === "plans" ? (
            <ItemSelector productId={product.id} />
          ) : (
            <QuantityStepper styleVariant="builder" productId={product.id} variantId={activeVariant} />
          )}
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
