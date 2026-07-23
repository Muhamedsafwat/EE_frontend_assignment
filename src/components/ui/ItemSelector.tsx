import { useBuilderStore } from "@/store/builder.store";

interface ItemSelectorProps {
  productId: string;
}

function ItemSelector({ productId }: ItemSelectorProps) {
  const isSelected = useBuilderStore((state) =>
    state.selections.some((s) => s.productId === productId)
  );

  const selectPlan = useBuilderStore((state) => state.selectPlan);

  return (
    <button
      className="h-8 rounded px-4 bg-white border border-wyze-purple text-wyze-purple hover:bg-wyze-purple hover:text-white disabled:bg-slate-200 disabled:text-slate-400 disabled:border-slate-200 duration-300"
      onClick={() => selectPlan(productId)}
      disabled={isSelected}
    >
      {isSelected ? "Selected" : "Select"}
    </button>
  );
}

export default ItemSelector;